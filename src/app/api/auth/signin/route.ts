import { NextRequest, NextResponse } from "next/server"
import { withErrorHandling } from "@/lib/api/withErrorHandling"
import { createClient } from "@/lib/supabase/server"
import { signinSchema } from "@/features/auth/schemas/signin-schema"
import { withValidation } from "@/lib/api/withValidation"

export const POST = withErrorHandling(async (request: NextRequest) => {
    const validationResult = await withValidation(signinSchema)(request);
    if (validationResult instanceof NextResponse) return validationResult;
    const { email, password } = validationResult.data
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.status }
        )
    }
    return NextResponse.json(
        {
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email,
            }
        },
        { status: 200 }
    )
})