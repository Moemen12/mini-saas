export const ROUTES = {
    HOME: "/",
    AUTH: {
        SIGNIN: "/auth/signin",
        SIGNUP: "/auth/signup",
    },
    DASHBOARD: "/dashboard",
    PROJECTS: "/dashboard/projects",
    SETTINGS: "/dashboard/settings",
} as const;

export type AppRoutes = typeof ROUTES;
