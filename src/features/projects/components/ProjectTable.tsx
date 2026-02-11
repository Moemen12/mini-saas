'use client'

import { useProjects } from "../hooks/useProjects";
import { Project } from "@/db/drizzle/schema/projects";
import { ProjectTableSkeleton } from "./shimmers/ProjectTableSkeleton";
import { ProjectTableHeader } from "./ProjectTableHeader";
import { ProjectTableRow } from "./ProjectTableRow";
import { ProjectTableFooter } from "./ProjectTableFooter";
import { ProjectTableError } from "./ProjectTableError";

export function ProjectTable() {
    const { data: projects = [], isLoading, isError } = useProjects();
    if (isLoading) return <ProjectTableSkeleton />;
    if (isError) return <ProjectTableError />;
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <ProjectTableHeader />

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
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No projects found. Create your first project to get started!
                                </td>
                            </tr>
                        ) : (
                            projects.map((project: Project) => (
                                <ProjectTableRow key={project.id} project={project} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ProjectTableFooter projectCount={projects.length} />
        </div>
    );
}