interface StatCardProps {
    title: string;
    value: string;
    icon: string;
    trend?: string;
    trendLabel?: string;
    color?: "primary" | "emerald" | "blue" | "red" | "amber" | "purple";
}

const colorClasses = {
    primary: {
        icon: "text-primary",
        bg: "bg-primary/10",
        trend: "bg-primary/10 text-primary",
    },
    emerald: {
        icon: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-100 dark:bg-emerald-900/20",
        trend: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    },
    blue: {
        icon: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/20",
        trend: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    red: {
        icon: "text-red-600 dark:text-red-400",
        bg: "bg-red-100 dark:bg-red-900/20",
        trend: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    },
    amber: {
        icon: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-100 dark:bg-amber-900/20",
        trend: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
    purple: {
        icon: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-100 dark:bg-purple-900/20",
        trend: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
};

export function StatsCard({
    title,
    value,
    icon,
    trend,
    trendLabel = "",
    color = "primary"
}: Readonly<StatCardProps>) {
    const colors = colorClasses[color];

    return (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-2.5 rounded-lg ${colors.bg}`}>
                    <span className={`material-icons text-lg sm:text-xl ${colors.icon}`}>
                        {icon}
                    </span>
                </div>
                {trend && (
                    <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${colors.trend}`}>
                        {trend} {trendLabel}
                    </span>
                )}
            </div>

            <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}