interface ProjectTableFooterProps {
    projectCount: number;
}

export function ProjectTableFooter({ projectCount }: Readonly<ProjectTableFooterProps>) {
    return (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-sm text-slate-500">
                Showing {projectCount} project{projectCount === 1 ? '' : 's'}
            </span>
            <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>
                    Previous
                </button>
                <button className="px-3 py-1 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>
                    Next
                </button>
            </div>
        </div>
    );
}