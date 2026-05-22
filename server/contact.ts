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

export async function handleContactRequest(req: RequestLike, res: ResponseLike) {
	const mod = await import("../api/contact.js") as {
		handleContactRequest: (req: RequestLike, res: ResponseLike) => Promise<void>;
	};
	await mod.handleContactRequest(req, res);
}