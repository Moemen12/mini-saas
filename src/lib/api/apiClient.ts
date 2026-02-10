type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<TResponse, TBody = unknown>(
    url: string,
    method: HttpMethod,
    body?: TBody
): Promise<TResponse> {
    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as TResponse;
}