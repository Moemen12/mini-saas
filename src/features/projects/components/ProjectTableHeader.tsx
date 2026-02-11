export function ProjectTableHeader() {
    return (
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                    placeholder="Search projects..."
                    type="text"
                />
            </div>
            <div className="flex items-center space-x-3">
                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 pl-4 pr-10 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>All Status</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                </select>
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-icons text-slate-500">filter_list</span>
                </button>
            </div>
        </div>
    );
}