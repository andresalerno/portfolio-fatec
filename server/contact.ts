import { processContactRequest } from "./contact-core";

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

async function readJsonBody(req: RequestLike) {
	if (req.body && typeof req.body === "object") {
		return req.body;
	}

	if (typeof req.on !== "function") {
		return {};
	}

	return await new Promise((resolve, reject) => {
		let body = "";

		req.on?.("data", (chunk) => {
			body += chunk?.toString() ?? "";
		});

		req.on?.("end", () => {
			if (!body) {
				resolve({});
				return;
			}

			try {
				resolve(JSON.parse(body));
			} catch {
				reject(new Error("Corpo da requisicao invalido."));
			}
		});

		req.on?.("error", reject);
	});
}

function sendJson(res: ResponseLike, statusCode: number, body: unknown) {
	if (typeof res.status === "function" && typeof res.json === "function") {
		const response = res.status(statusCode);
		response.json?.(body);
		return;
	}

	if (typeof res.setHeader === "function") {
		res.setHeader("Content-Type", "application/json");
	}

	res.statusCode = statusCode;
	res.end(JSON.stringify(body));
}

export async function handleContactRequest(req: RequestLike, res: ResponseLike) {
	try {
		const body = await readJsonBody(req);
		const result = await processContactRequest(req.method, body);
		sendJson(res, result.statusCode, result.body);
	} catch {
		sendJson(res, 400, { error: "Corpo da requisicao invalido.", success: false });
	}
}