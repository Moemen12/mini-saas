export function ProjectTableError() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 flex justify-center items-center">
            <div className="flex flex-col items-center space-y-4 text-center">
                <span className="material-icons text-4xl text-red-500">error_outline</span>
                <p className="text-slate-500 font-medium">Failed to load projects. Please try again later.</p>
            </div>
        </div>
    );
}