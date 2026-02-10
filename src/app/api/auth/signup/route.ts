import { NextRequest, NextResponse } from "next/server"
import { withErrorHandling } from "@/lib/api/withErrorHandling"
import { withValidation } from "@/lib/api/withValidation"
import { createClient } from "@/lib/supabase/server"
import { signupSchema } from "@/features/auth/schemas/signup-schema"

export const POST = withErrorHandling(async (request: NextRequest) => {
    const validationResult = await withValidation(signupSchema)(request);

    if (validationResult instanceof NextResponse) return validationResult;

    const { email, password, name } = validationResult.data
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name },
        },
    })

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.status || 400 }
        )
    }

    return NextResponse.json(
        {
            success: true,
            user: {
                id: data.user?.id,
                email: data.user?.email,
            }
        },
        { status: 201 }
    )
})