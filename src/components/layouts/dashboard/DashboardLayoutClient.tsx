"use client"

import { useState } from "react"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardHeader } from "./DashboardHeader"

interface DashboardLayoutClientProps {
    children: React.ReactNode
}

export function DashboardLayoutClient({ children }: Readonly<DashboardLayoutClientProps>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Mobile sidebar overlay */}
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
                    breadcrumbs={[{ label: "Projects", href: "#" }]}
                    onMenuClick={toggleSidebar}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}