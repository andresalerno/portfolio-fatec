import { handleContactRequest } from "../server/contact";

export default async function handler(req: unknown, res: unknown) {
  await handleContactRequest(req as Parameters<typeof handleContactRequest>[0], res as Parameters<typeof handleContactRequest>[1]);
}