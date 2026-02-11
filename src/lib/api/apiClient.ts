import { env } from "@/config/env";
import { isServer } from "@tanstack/react-query";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<TResponse, TBody = unknown>(
    url: string,
    method: HttpMethod,
    body?: TBody,
    headers?: Record<string, string>
): Promise<TResponse> {
    const baseUrl = isServer ? env.APP_BASE_URL : "";
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    const response = await fetch(fullUrl, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as TResponse;
}