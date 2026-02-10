import { Button } from "@/components/ui/Button";

interface Breadcrumb {
    label: string;
    href: string;
}

interface DashboardHeaderProps {
    readonly breadcrumbs?: readonly Breadcrumb[];
    readonly onMenuClick?: () => void;
}

export function DashboardHeader({ breadcrumbs = [], onMenuClick }: DashboardHeaderProps) {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0">
            <div className="flex items-center text-sm">
                <button
                    onClick={onMenuClick}
                    className="p-2 mr-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
                    aria-label="Open sidebar"
                >
                    <span className="material-icons">menu</span>
                </button>
                <nav aria-label="Breadcrumb" className="hidden sm:flex">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/dashboard" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                Dashboard
                            </a>
                        </li>
                        {breadcrumbs.map((crumb, index) => (
                            <li key={crumb.label}>
                                <div className="flex items-center">
                                    <span className="material-icons text-base text-slate-400">chevron_right</span>
                                    <a
                                        href={crumb.href}
                                        className={`ml-1 font-medium transition-colors ${index === breadcrumbs.length - 1
                                            ? "text-slate-900 dark:text-white"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                            }`}
                                    >
                                        {crumb.label}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="material-icons">notifications_none</span>
                </button>
                <Button className="flex items-center shadow-sm">
                    <span className="material-icons text-sm mr-2">add</span>{" "}
                    New Project
                </Button>
            </div>
        </header>
    );
}
