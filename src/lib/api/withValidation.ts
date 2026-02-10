import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export function withValidation<T>(schema: z.ZodType<T>) {
    return async (request: NextRequest): Promise<{ data: T } | NextResponse> => {
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: z.treeifyError(validation.error),
                },
                { status: 400 }
            );
        }

        return { data: validation.data };
    };
}