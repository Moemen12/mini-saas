export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="material-icons text-4xl text-slate-400 dark:text-slate-500">settings_suggest</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Settings
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8">
                We&apos;re crafting powerful tools to help you manage your workflow better. Stay tuned!
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700"><span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>Coming Soon</div>
        </div>
    );
}
