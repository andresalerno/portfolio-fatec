type ContactPayload = {
  email: string;
  message: string;
  name: string;
  subject: string;
  website: string;
};

export class ContactRequestError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly exposeMessage = true,
  ) {
    super(message);
  }
}

type ContactResponse = {
  body: { error?: string; success: boolean };
  statusCode: number;
};

type MailTransporter = {
  sendMail: (options: {
    from: string;
    html: string;
    replyTo: string;
    subject: string;
    text: string;
    to: string;
  }) => Promise<unknown>;
};

let cachedTransporter: MailTransporter | undefined;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ContactRequestError(500, `Missing required environment variable: ${name}`, false);
  }
  return value;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new ContactRequestError(400, "Dados invalidos.");
  }

  const payload = body as Record<string, unknown>;
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const website = payload.website == null ? "" : String(payload.website).trim();

  if (name.length < 2) {
    throw new ContactRequestError(400, "Informe seu nome.");
  }
  if (name.length > 120) {
    throw new ContactRequestError(400, "Nome muito longo.");
  }
  if (!isValidEmail(email) || email.length > 320) {
    throw new ContactRequestError(400, "Informe um e-mail valido.");
  }
  if (subject.length < 3) {
    throw new ContactRequestError(400, "Informe um assunto.");
  }
  if (subject.length > 160) {
    throw new ContactRequestError(400, "Assunto muito longo.");
  }
  if (message.length < 10) {
    throw new ContactRequestError(400, "Escreva uma mensagem com mais detalhes.");
  }
  if (message.length > 5000) {
    throw new ContactRequestError(400, "Mensagem muito longa.");
  }

  return { email, message, name, subject, website };
}

async function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const nodemailer = await import("nodemailer");

  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(getRequiredEnv("SMTP_PORT"));
  if (!Number.isFinite(port)) {
    throw new ContactRequestError(500, "SMTP_PORT must be a valid number.", false);
  }

  const secure = (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")).trim() === "true";
  cachedTransporter = nodemailer.default.createTransport({
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
  const transporter = await getTransporter();
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

export async function processContactRequest(method: string | undefined, body: unknown): Promise<ContactResponse> {
  if (method !== "POST") {
    return {
      body: { error: "Metodo nao permitido.", success: false },
      statusCode: 405,
    };
  }

  try {
    if (body && typeof body === "object" && "website" in body) {
      const honeypot = String((body as Record<string, unknown>).website ?? "").trim();
      if (honeypot) {
        return {
          body: { success: true },
          statusCode: 200,
        };
      }
    }

    const payload = validatePayload(body);
    await sendContactEmail(payload);
    return {
      body: { success: true },
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return {
        body: {
          error: error.exposeMessage ? error.message : "Falha ao enviar a mensagem.",
          success: false,
        },
        statusCode: error.statusCode,
      };
    }

    console.error("Contact form error", error);
    return {
      body: { error: "Falha ao enviar a mensagem.", success: false },
      statusCode: 500,
    };
  }
}