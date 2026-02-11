'use client'

import { useDashboardStats } from "../hooks/useDashboardStats";
import { BudgetOverview } from "./BudgetOverview";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { StatsCard } from "./StatCard";
import { TeamWorkload } from "./TeamWorkload";



export default function DashboardStatsPage() {
    const { data: stats, isLoading, isError } = useDashboardStats();
    if (isLoading) return <DashboardSkeleton />;
    if (isError || !stats) {
        return (
            <div className="p-8 flex items-center justify-center min-h-100">
                <p className="text-red-500 font-medium">Failed to load dashboard metrics. Please refresh.</p>
            </div>
        );
    }
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Dashboard Overview
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    Real-time performance metrics for your projects
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatsCard
                    title="Completed"
                    value={String(stats.overview.completed)}
                    icon="check_circle"
                    trend={`${stats.trends.growthRate}%`}
                    trendLabel="growth"
                    color="emerald"
                />
                <StatsCard
                    title="Active"
                    value={String(stats.overview.active)}
                    icon="rocket_launch"
                    color="blue"
                />
                <StatsCard
                    title="Overdue"
                    value={String(stats.timeline.overdue)}
                    icon="priority_high"
                    color="red"
                />
                <StatsCard
                    title="Due Today"
                    value={String(stats.timeline.dueToday)}
                    icon="event"
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                    <BudgetOverview stats={stats.budget} />
                </div>
                <div className="lg:col-span-1">
                    <TeamWorkload members={stats.team.members} />
                </div>
            </div>
        </div>
    );
}