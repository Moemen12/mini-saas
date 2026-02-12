import { MetadataRoute } from "next";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/", "/api/"],
        },
        sitemap: `${env.APP_BASE_URL}/sitemap.xml`,
    };
}
