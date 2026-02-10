import { updateSession } from "@/lib/supabase/proxy";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTES } from "./config/routes";

export async function proxy(request: NextRequest) {
    const { user, supabaseResponse } = await updateSession(request);

    const path = request.nextUrl.pathname;
    const isAuthRoute = path.startsWith("/auth");

    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    if (!user && !path.startsWith("/auth") && path !== "/") {
        return NextResponse.redirect(new URL(ROUTES.AUTH.SIGNIN, request.url));
    }

    return supabaseResponse;
}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|otf)$).*)",
    ],
};

