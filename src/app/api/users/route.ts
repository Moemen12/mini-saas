import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/withErrorHandling";
import { getAuthUser } from "@/lib/api/auth-utils";
import { createAdminClient } from "@/lib/supabase/admin";

export const GET = withErrorHandling(async () => {
    const { response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;

    const adminSupabase = createAdminClient();
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const sanitizedUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.user_metadata.name
    }));

    return NextResponse.json(sanitizedUsers);
});