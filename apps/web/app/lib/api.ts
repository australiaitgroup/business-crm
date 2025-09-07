type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface ApiClientOptions {
  baseUrl?: string;
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
}

export interface ApiErrorShape {
  code: string;
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly code: string;
  public readonly details?: unknown;
  constructor(payload: ApiErrorShape) {
    super(payload.message);
    this.code = payload.code;
    this.details = payload.details;
  }
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
  const getToken = options.getAccessToken ?? (() => undefined);

  async function request<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
    const token = await getToken();
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(`${baseUrl}${path}`, { ...init, headers });
    const isJson = res.headers.get("content-type")?.includes("application/json");

    if (!res.ok) {
      const err = isJson ? await res.json() : { code: String(res.status), message: res.statusText };
      throw new ApiError(err as ApiErrorShape);
    }
    return (isJson ? await res.json() : (undefined as unknown)) as T;
  }

  return {
    get: <T>(path: string) => request<T>(path, { method: "GET" }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) }),
    delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  };
}

