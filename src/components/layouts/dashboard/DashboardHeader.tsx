"use client";

import { ROUTES } from "@/config/routes";
import { useUser } from "@/features/auth";
import Link from "next/link";

interface DashboardHeaderProps {
    readonly breadcrumbs?: readonly { label: string; href: string }[];
    readonly onMenuClick?: () => void;
}

export function DashboardHeader({ breadcrumbs = [], onMenuClick }: DashboardHeaderProps) {
    const { data: user, isLoading } = useUser();
    const userInitials = user?.email?.substring(0, 2).toUpperCase() || "U";
    const hasBreadcrumbs = breadcrumbs.length > 0;

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0">
            <div className="flex items-center text-sm">
                <button
                    onClick={onMenuClick}
                    className="p-2 mr-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
                >
                    <span className="material-icons">menu</span>
                </button>

                {hasBreadcrumbs && (
                    <nav aria-label="Breadcrumb" className="hidden sm:flex">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href={ROUTES.DASHBOARD}
                                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {breadcrumbs.map((crumb, index) => (
                                <li key={crumb.href} className="flex items-center">
                                    <span className="material-icons text-base text-slate-400">chevron_right</span>
                                    <Link
                                        href={crumb.href}
                                        className={`ml-1 font-medium transition-colors ${index === breadcrumbs.length - 1
                                            ? "text-slate-900 dark:text-white pointer-events-none"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                            }`}
                                    >
                                        {crumb.label}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
            </div>

            <div className="flex items-center space-x-3">
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="material-icons">notifications_none</span>
                </button>

                <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0 transition-colors duration-200">
                    {isLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 border-t-slate-500 animate-spin" />
                    ) : (
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 tracking-tight">
                            {userInitials}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}