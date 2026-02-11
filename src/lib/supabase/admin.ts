import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

export function createAdminClient() {
    return createClient(env.SUPABASE_URL, env.SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}