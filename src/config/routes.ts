export const ROUTES = {
    HOME: "/",
    AUTH: {
        SIGNIN: "/auth/signin",
        SIGNUP: "/auth/signup",
    },
    DASHBOARD: "/dashboard",
    PROJECTS: "/dashboard/projects",
    TEAM: "/dashboard/team",
    ANALYTICS: "/dashboard/analytics",
    SETTINGS: "/dashboard/settings",
    SUPPORT: "/dashboard/support",
} as const;

export type AppRoutes = typeof ROUTES;
