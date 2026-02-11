"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardHeader } from "./DashboardHeader"
import { ROUTES } from "@/config/routes"

interface DashboardLayoutClientProps {
    children: React.ReactNode
}

export function DashboardLayoutClient({ children }: Readonly<DashboardLayoutClientProps>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const closeSidebar = () => setIsSidebarOpen(false)

    const generateBreadcrumbs = () => {
        if (pathname === ROUTES.DASHBOARD) {
            return [];
        }
        const segments = pathname.split('/').filter(Boolean);
        return segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/, ' ');

            return { label, href };
        }).filter(crumb => crumb.href !== ROUTES.DASHBOARD);
    };
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {isSidebarOpen && (
                <button
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeSidebar}
                    aria-label="Close sidebar"
                />
            )}

            <DashboardSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <DashboardHeader
                    breadcrumbs={generateBreadcrumbs()}
                    onMenuClick={toggleSidebar}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}