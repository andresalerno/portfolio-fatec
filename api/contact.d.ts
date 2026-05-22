export function handleContactRequest(
  req: {
    body?: unknown;
    method?: string;
    on?: (event: "data" | "end" | "error", listener: (chunk?: Buffer | string | Error) => void) => void;
  },
  res: {
    end: (body?: string) => void;
    json?: (body: unknown) => void;
    setHeader?: (name: string, value: string) => void;
    status?: (code: number) => {
      end: (body?: string) => void;
      json?: (body: unknown) => void;
      setHeader?: (name: string, value: string) => void;
      status?: (code: number) => unknown;
      statusCode?: number;
    };
    statusCode?: number;
  },
): Promise<void>;

export default function handler(
  req: unknown,
  res: unknown,
): Promise<void>;
