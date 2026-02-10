import { AuthHeader } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth - SaaS Platform",
    description: "Secure authentication",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark transition-colors duration-300">
            <div className="w-full max-w-md">
                <AuthHeader />

                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-none p-8 md:p-10 backdrop-blur-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}