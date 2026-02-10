import { NextRequest, NextResponse } from "next/server"
import { logCriticalError } from "./errorLogger"

type Handler = (request: NextRequest) => Promise<NextResponse>

export function withErrorHandling(handler: Handler) {
    return async (request: NextRequest) => {
        try {
            return await handler(request)
        } catch (error) {
            await logCriticalError(error, request);

            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}