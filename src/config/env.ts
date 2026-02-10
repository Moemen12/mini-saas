const requiredServerVars = [
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
    "DATABASE_URL"
] as const;

const requiredClientVars = [
    "APP_BASE_URL",
] as const;

function validateEnv<T extends readonly string[]>(keys: T, prefix = "") {
    const missing: string[] = [];

    keys.forEach((key) => {
        const value = process.env[key];
        if (!value) missing.push(key);
    });

    if (missing.length > 0) {
        throw new Error(`❌ Missing ${prefix} environment variables: ${missing.join(", ")}`);
    }
}


validateEnv(requiredServerVars, "server");
validateEnv(requiredClientVars, "client");

export const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY!,
    APP_BASE_URL: process.env.APP_BASE_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
} as const;