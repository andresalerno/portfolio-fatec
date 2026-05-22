type VercelLikeRequest = {
  body?: unknown;
  method?: string;
};

type VercelLikeResponse = {
  json: (body: { error?: string; success: boolean }) => void;
  status: (statusCode: number) => VercelLikeResponse;
};

export default async function handler(request: VercelLikeRequest, response: VercelLikeResponse) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Metodo nao permitido.", success: false });
    return;
  }

  let body: unknown;

  try {
    body = request.body;
  } catch {
    response.status(400).json({ error: "Corpo da requisicao invalido.", success: false });
    return;
  }

  const mod = await import("../server/contact-core");
  const result = await mod.processContactRequest("POST", body);
  response.status(result.statusCode).json(result.body);
}