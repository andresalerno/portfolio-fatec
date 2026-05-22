import { createRequire } from "node:module";

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

const require = createRequire(import.meta.url);

export async function handleContactRequest(req: RequestLike, res: ResponseLike) {
	const mod = require("../api/contact.cjs") as {
		handleContactRequest: (req: RequestLike, res: ResponseLike) => Promise<void>;
	};
	await mod.handleContactRequest(req, res);
}