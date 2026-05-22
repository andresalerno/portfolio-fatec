import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail valido.").max(320, "E-mail muito longo."),
  subject: z.string().trim().min(3, "Informe um assunto.").max(160, "Assunto muito longo."),
  message: z.string().trim().min(10, "Escreva uma mensagem com mais detalhes.").max(5000, "Mensagem muito longa."),
  website: z.string().optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

type RequestLike = {
  body?: unknown;
  method?: string;
  on?: (event: "data" | "end" | "error", listener: (chunk?: Buffer | string | Error) => void) => void;
};

type ResponseLike = {
  end: (body?: string) => void;
  json?: (body: unknown) => void;
  setHeader?: (name: string, value: string) => void;
  status?: (code: number) => ResponseLike;
  statusCode?: number;
};

class ContactRequestError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
    readonly exposeMessage = true,
  ) {
    super(message);
  }
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ContactRequestError(500, `Missing required environment variable: ${name}`, false);
  }
  return value;
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(getRequiredEnv("SMTP_PORT"));

  if (!Number.isFinite(port)) {
    throw new ContactRequestError(500, "SMTP_PORT must be a valid number.", false);
  }

  const secure = (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")).trim() === "true";

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });

  return cachedTransporter;
}

function sendJson(res: ResponseLike, statusCode: number, body: unknown) {
  const status = res.status;
  const json = res.json;

  if (typeof status === "function" && typeof json === "function") {
    status.call(res, statusCode).json?.(body);
    return;
  }

  res.statusCode = statusCode;
  res.setHeader?.("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: RequestLike) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const on = req.on;

  if (typeof on !== "function") {
    return {};
  }

  return await new Promise<unknown>((resolve, reject) => {
    let body = "";

    on("data", (chunk) => {
      body += chunk?.toString() ?? "";
    });

    on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new ContactRequestError(400, "Corpo da requisicao invalido."));
      }
    });

    on("error", () => {
      reject(new ContactRequestError(400, "Nao foi possivel ler a requisicao."));
    });
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTextMessage(payload: ContactPayload) {
  return [
    "Nova mensagem recebida pelo formulario do portfolio",
    "",
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Assunto: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");
}

function buildHtmlMessage(payload: ContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2>Nova mensagem recebida pelo formulario do portfolio</h2>
      <p><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(payload.subject)}</p>
      <hr />
      <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
    </div>
  `;
}

async function sendContactEmail(payload: ContactPayload) {
  const transporter = getTransporter();
  const to = getRequiredEnv("CONTACT_TO_EMAIL");
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || getRequiredEnv("SMTP_USER");

  await transporter.sendMail({
    to,
    from,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: buildTextMessage(payload),
    html: buildHtmlMessage(payload),
  });
}

export async function handleContactRequest(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Metodo nao permitido.", success: false });
    return;
  }

  try {
    const body = await readJsonBody(req);

    if (body && typeof body === "object" && "website" in body) {
      const honeypot = String((body as { website?: unknown }).website ?? "").trim();
      if (honeypot) {
        sendJson(res, 200, { success: true });
        return;
      }
    }

    const payload = contactSchema.parse(body);
    await sendContactEmail(payload);

    sendJson(res, 200, { success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendJson(res, 400, {
        error: error.issues[0]?.message || "Dados invalidos.",
        success: false,
      });
      return;
    }

    if (error instanceof ContactRequestError) {
      sendJson(res, error.statusCode, {
        error: error.exposeMessage ? error.message : "Falha ao enviar a mensagem.",
        success: false,
      });
      return;
    }

    console.error("Contact form error", error);
    sendJson(res, 500, { error: "Falha ao enviar a mensagem.", success: false });
  }
}

export default async function handler(req: unknown, res: unknown) {
  await handleContactRequest(req as RequestLike, res as ResponseLike);
}