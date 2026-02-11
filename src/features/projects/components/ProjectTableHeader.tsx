import { Button } from "@/components/ui/Button";

interface ProjectTableHeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    onAddClick: () => void;
}

export function ProjectTableHeader({
    search,
    onSearchChange,
    status,
    onStatusChange,
    onAddClick
}: Readonly<ProjectTableHeaderProps>) {
    return (
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-md">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                    placeholder="Search projects..."
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center space-x-3">
                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium py-2.5 pl-4 pr-10 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on hold">On Hold</option>
                </select>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                <Button
                    onClick={onAddClick}
                    className="flex items-center whitespace-nowrap shadow-md shadow-primary/10 rounded-xl px-5 py-2.5"
                >
                    <span className="material-icons text-lg mr-2">add</span>New Project
                </Button>
            </div>
        </div>
    );
}