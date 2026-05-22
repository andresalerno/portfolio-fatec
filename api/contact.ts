import { processContactRequest } from "../server/contact-core";

function json(body: { error?: string; success: boolean }, status: number) {
  return Response.json(body, { status });
}

export async function GET() {
  const result = await processContactRequest("GET", undefined);
  return json(result.body, result.statusCode);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Corpo da requisicao invalido.", success: false }, 400);
  }

  const result = await processContactRequest("POST", body);
  return json(result.body, result.statusCode);
}