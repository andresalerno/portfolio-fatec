class ContactRequestError extends Error {
  constructor(statusCode, message, exposeMessage = true) {
    super(message);
    this.statusCode = statusCode;
    this.exposeMessage = exposeMessage;
  }
}

let cachedTransporter;

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ContactRequestError(500, `Missing required environment variable: ${name}`, false);
  }
  return value;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(body) {
  if (!body || typeof body !== "object") {
    throw new ContactRequestError(400, "Dados invalidos.");
  }

  const payload = body;
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

  const nodemailerModule = await import("nodemailer");
  const nodemailer = nodemailerModule.default;
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTextMessage(payload) {
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

function buildHtmlMessage(payload) {
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

async function sendContactEmail(payload) {
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

function sendJson(response, statusCode, body) {
  response.status(statusCode).json(body);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Metodo nao permitido.", success: false });
    return;
  }

  try {
    const body = request.body;

    if (body && typeof body === "object" && "website" in body) {
      const honeypot = String(body.website ?? "").trim();
      if (honeypot) {
        sendJson(response, 200, { success: true });
        return;
      }
    }

    const payload = validatePayload(body);
    await sendContactEmail(payload);
    sendJson(response, 200, { success: true });
  } catch (error) {
    if (error instanceof ContactRequestError) {
      sendJson(response, error.statusCode, {
        error: error.exposeMessage ? error.message : "Falha ao enviar a mensagem.",
        success: false,
      });
      return;
    }

    console.error("Contact form error", error);
    sendJson(response, 500, { error: "Falha ao enviar a mensagem.", success: false });
  }
}