import { MetadataRoute } from "next";
import { env } from "@/config/env";
import { ROUTES } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = env.APP_BASE_URL;

    const routes = [
        ROUTES.HOME,
        ROUTES.AUTH.SIGNIN,
        ROUTES.AUTH.SIGNUP
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === ROUTES.HOME ? 1 : 0.8,
    }));

    return [...routes];
}
