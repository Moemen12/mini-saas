import { formatCurrency } from "@/features/projects/utils/formaters";

interface BudgetOverviewProps {
    stats: {
        total: number;
        spent: number;
        allocated: number;
    };
}

export function BudgetOverview({ stats }: Readonly<BudgetOverviewProps>) {
    const spentPercentage = stats.total > 0 ? Math.round((stats.spent / stats.total) * 100) : 0;
    const remaining = stats.total - stats.spent;
    return (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-full">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Budget Overview
                </h3>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <span className="material-icons text-blue-600 dark:text-blue-400 text-lg sm:text-xl">
                        account_balance_wallet
                    </span>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                            Budget Utilization
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                            {spentPercentage}%
                        </span>
                    </div>
                    <div className="relative w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${spentPercentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        {formatCurrency(String(remaining))} remaining
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
                            Total
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                            {formatCurrency(String(stats.total))}
                        </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
                        <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider mb-1">
                            Spent
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400">
                            {formatCurrency(String(stats.spent))}
                        </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 col-span-2 sm:col-span-1">
                        <p className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider mb-1">
                            Allocated
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400">
                            {formatCurrency(String(stats.allocated))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}