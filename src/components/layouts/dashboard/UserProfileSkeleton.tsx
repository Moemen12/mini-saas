export function UserProfileSkeleton() {
    return (
        <div className="flex items-center p-2 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="ml-3 space-y-2 flex-1">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-2 w-24 bg-slate-100 dark:bg-slate-900 rounded" />
            </div>
        </div>
    );
}