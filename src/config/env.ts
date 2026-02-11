import { isServer } from "@tanstack/react-query";

const requiredServerVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "DATABASE_URL",
    "DIRECT_URL",
    "NEXT_PUBLIC_APP_BASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY"
] as const;

function validateEnv(keys: readonly string[]) {
    const missing: string[] = [];

    keys.forEach((key) => {
        const value = process.env[key];
        if (!value) missing.push(key);
    });

    if (missing.length > 0) {
        throw new Error(`❌ Missing server environment variables: ${missing.join(", ")}`);
    }
}

if (isServer) {
    validateEnv(requiredServerVars);
}

export const env = {
    // These are only accessed on server
    DATABASE_URL: process.env.DATABASE_URL!,
    DIRECT_URL: process.env.DIRECT_URL!,
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,

    // This is safe for both
    SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL!,
} as const;