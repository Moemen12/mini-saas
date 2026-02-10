"use client";

import { ROUTES } from "@/config/routes";
import { usePathname } from "next/navigation";

export function AuthHeader() {
    const pathname = usePathname();
    const isSignin = pathname === ROUTES.AUTH.SIGNIN;

    return (
        <div className="flex flex-col items-center mb-10">
            <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 transition-transform hover:scale-110">
                <span className="material-icons text-white text-3xl">bolt</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {isSignin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
                {isSignin
                    ? "Please enter your details to sign in."
                    : "Enter your details to get started."}
            </p>
        </div>
    );
}