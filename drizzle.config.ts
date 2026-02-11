import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
    schema: "./src/db/drizzle/schema/index.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
    schemaFilter: ["public"],
    dbCredentials: {
        url: process.env.DIRECT_URL!,
    },

});