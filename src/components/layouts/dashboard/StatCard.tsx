interface StatCardProps {
    label: string;
    value: string;
    icon: string;
    iconColorClass?: string;
    iconBgClass?: string;
    trend?: {
        value: string;
        isUp: boolean;
        description: string;
    };
    progress?: {
        current: number;
        total: number;
        description: string;
    };
}

export function StatCard({
    label,
    value,
    icon,
    iconColorClass = "text-primary",
    iconBgClass = "bg-primary/10",
    trend,
    progress,
}: Readonly<StatCardProps>) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
                </div>
                <div className={`${iconBgClass} p-3 rounded-lg`}>
                    <span className={`material-icons ${iconColorClass}`}>{icon}</span>
                </div>
            </div>

            {trend && (
                <div className={`mt-4 flex items-center text-xs font-medium ${trend.isUp ? "text-green-600" : "text-orange-600"}`}>
                    <span className="material-icons text-sm mr-1">
                        {trend.isUp ? "trending_up" : "priority_high"}
                    </span>
                    <span>{trend.value} {trend.description}</span>
                </div>
            )}

            {progress && (
                <div className="mt-4 flex items-center text-xs text-slate-500">
                    <span className="font-medium">{progress.description}</span>
                    <div className="ml-3 w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="bg-emerald-500 h-full transition-all duration-500"
                            style={{ width: `${(progress.current / progress.total) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
}
