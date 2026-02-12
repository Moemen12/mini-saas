interface SidebarHeaderProps {
    onClose?: () => void;
}

export function SidebarHeader({ onClose }: Readonly<SidebarHeaderProps>) {
    return (
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-primary p-1.5 rounded-lg">
                    <span className="material-icons text-white text-xl">layers</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    ProFlow
                </span>
            </div>
            <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                aria-label="Close sidebar"
            >
                <span className="material-icons">close</span>
            </button>
        </div>
    );
}