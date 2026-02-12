interface ProjectTableFooterProps {
    projectCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ProjectTableFooter({
    projectCount,
    currentPage,
    totalPages,
    onPageChange
}: Readonly<ProjectTableFooterProps>) {

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages || totalPages === 0;

    return (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col">
                <span className="text-sm text-slate-500">
                    Total: <span className="font-medium text-slate-900 dark:text-white">{projectCount}</span> projects
                </span>
                {totalPages > 0 && (
                    <span className="text-xs text-slate-400">
                        Page {currentPage} of {totalPages}
                    </span>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isPrevDisabled}
                    className="px-4 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isNextDisabled}
                    className="px-4 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
}