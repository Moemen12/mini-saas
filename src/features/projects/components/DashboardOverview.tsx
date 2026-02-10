"use client";

import { useState } from "react";
import { DashboardSidebar } from "../../../components/layouts/dashboard/DashboardSidebar";
import { DashboardHeader } from "../../../components/layouts/dashboard/DashboardHeader";
import { StatCard } from "../../../components/layouts/dashboard/StatCard";
import { ProjectTable } from "./ProjectTable";

export function DashboardOverview() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {isSidebarOpen && (
                <button
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <DashboardSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <DashboardHeader
                    breadcrumbs={[{ label: 'Projects', href: '#' }]}
                    onMenuClick={toggleSidebar}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                label="Total Projects"
                                value="24"
                                icon="folder_open"
                                trend={{ value: '12%', isUp: true, description: 'increase from last month' }}
                            />
                            <StatCard
                                label="Active Deadlines"
                                value="7"
                                icon="event_note"
                                iconColorClass="text-orange-600 dark:text-orange-400"
                                iconBgClass="bg-orange-100 dark:bg-orange-900/30"
                                trend={{ value: '3', isUp: false, description: 'projects due this week' }}
                            />
                            <StatCard
                                label="Remaining Budget"
                                value="$42,850"
                                icon="account_balance_wallet"
                                iconColorClass="text-emerald-600 dark:text-emerald-400"
                                iconBgClass="bg-emerald-100 dark:bg-emerald-900/30"
                                progress={{ current: 68, total: 100, description: '68% of total budget used' }}
                            />
                        </div>

                        {/* Projects Table */}
                        <ProjectTable />
                    </div>
                </main>
            </div>
        </div>
    );
}
