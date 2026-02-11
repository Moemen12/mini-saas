

function SkeletonRow({ id }: Readonly<{ id: string }>) {
    return (
        <tr key={id}>
            <td className="px-6 py-4">
                <div className="flex flex-col space-y-2">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-48 animate-pulse" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-24 animate-pulse" />
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-24 animate-pulse" />
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-32 animate-pulse" />
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-28 animate-pulse" />
            </td>

            <td className="px-6 py-4 text-right">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-20 ml-auto animate-pulse" />
            </td>

            <td className="px-6 py-4 text-right">
                <div className="h-6 w-6 bg-slate-100 dark:bg-slate-800 rounded ml-auto animate-pulse" />
            </td>
        </tr>
    );
}
const skeletonIds = Array.from({ length: 5 }, (_, i) =>
    `project-skeleton-${i + 1}`
);


export function ProjectTableSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="h-10 w-32 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Assigned To</th>
                            <th className="px-6 py-4">Deadline</th>
                            <th className="px-6 py-4 text-right">Budget</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {skeletonIds.map((id) => (
                            <SkeletonRow key={id} id={id} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-32 animate-pulse" />

                <div className="flex space-x-2">
                    <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}