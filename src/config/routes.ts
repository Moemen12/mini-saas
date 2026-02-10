export const ROUTES = {
    HOME: "/",
    AUTH: {
        SIGNIN: "/auth/signin",
        SIGNUP: "/auth/signup",
    },
    DASHBOARD: "/dashboard",
} as const;

export type AppRoutes = typeof ROUTES;
