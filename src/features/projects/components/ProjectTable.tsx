'use client'

import { useState, useMemo } from "react";
import { useProjects } from "../hooks/useProjects";
import { ProjectTableSkeleton } from "./shimmers/ProjectTableSkeleton";
import { ProjectTableHeader } from "./ProjectTableHeader";
import { ProjectTableRow } from "./ProjectTableRow";
import { ProjectTableFooter } from "./ProjectTableFooter";
import { ProjectTableError } from "./ProjectTableError";
import { Project } from "@/db/drizzle/schema/projects";
import { ProjectModal } from "./CreateProjectModal";

export function ProjectTable() {
    const { data: projects = [], isLoading, isError } = useProjects();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "all" || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [projects, search, statusFilter]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterUpdate = (type: 'search' | 'status', value: string) => {
        if (type === 'search') setSearch(value);
        if (type === 'status') setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    if (isLoading) return <ProjectTableSkeleton />;
    if (isError) return <ProjectTableError />;

    return (
        <>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
                <ProjectTableHeader
                    search={search}
                    onSearchChange={(val) => handleFilterUpdate('search', val)}
                    status={statusFilter}
                    onStatusChange={(val) => handleFilterUpdate('status', val)}
                    onAddClick={handleAdd}
                />

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
                            {paginatedProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                <span className="material-icons text-slate-300">search_off</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-900 dark:text-white font-medium">No projects found</p>
                                                <p className="text-sm text-slate-500">
                                                    {search || statusFilter !== "all"
                                                        ? "Try adjusting your filters or search terms."
                                                        : "Start by creating your first project."}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedProjects.map((project: Project) => (
                                    <ProjectTableRow
                                        key={project.id}
                                        project={project}
                                        onEdit={() => handleEdit(project)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <ProjectTableFooter
                    projectCount={filteredProjects.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                project={selectedProject}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}