import { Project } from "@/db/drizzle/schema/projects";
import { formatCurrency, formatDate } from "../utils/formaters";

const statusClasses: Record<string, string> = {
    'active': 'bg-primary/10 text-primary',
    'completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'on hold': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const statusLabels: Record<string, string> = {
    'active': 'In Progress',
    'completed': 'Completed',
    'on hold': 'On Hold',
};

interface ProjectTableRowProps {
    project: Project;
}

export function ProjectTableRow({ project }: Readonly<ProjectTableRowProps>) {
    const email = project.assignedTo;
    const displayName = email ? email.split("@")[0] : "Unassigned";
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 dark:text-white">{project.name}</span>
                    <span className="text-xs text-slate-500">Project ID: {project.id.split('-')[0]}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[project.status]}`}>
                    {statusLabels[project.status]}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {project.assignedTo?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {displayName}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">{formatDate(project.deadline)}</span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(project.budget)}</span>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-icons">more_vert</span>
                </button>
            </td>
        </tr>
    );
}