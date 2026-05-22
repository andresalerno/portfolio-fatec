function json(body: { error?: string; success: boolean }, status: number) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
    },
    status,
  });
}

async function loadProcessor() {
  const mod = await import("../server/contact-core");
  return mod.processContactRequest;
}

export async function GET() {
  return json({ error: "Metodo nao permitido.", success: false }, 405);
}

export async function POST(request: Request) {
  const processContactRequest = await loadProcessor();
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Corpo da requisicao invalido.", success: false }, 400);
  }

  const result = await processContactRequest("POST", body);
  return json(result.body, result.statusCode);
}