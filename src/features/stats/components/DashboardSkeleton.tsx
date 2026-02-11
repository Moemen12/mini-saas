export function DashboardSkeleton() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-64 bg-slate-100 dark:bg-slate-800/50 rounded-lg" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800" />
                ))}
            </div>

            {/* Bottom Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-75 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800" />
                <div className="lg:col-span-1 h-75 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800" />
            </div>
        </div>
    );
}