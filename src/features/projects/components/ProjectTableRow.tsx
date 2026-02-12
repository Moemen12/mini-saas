'use client'

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/db/drizzle/schema/projects";
import { formatCurrency, formatDate } from "../utils/formaters";
import { useDeleteProject } from "../hooks/useDeleteProject";

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
    onEdit: () => void;
}

export function ProjectTableRow({ project, onEdit }: Readonly<ProjectTableRowProps>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    const email = project.assignedTo;
    const displayName = email ? email.split("@")[0] : "Unassigned";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleMenuToggle = () => {
        if (!isMenuOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDelete = () => {
        if (globalThis.window.confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
            deleteProject(project.id, {
                onSuccess: () => {
                    setIsMenuOpen(false);
                },
            });
        }
    };

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
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-slate-700">
                        {project.assignedTo?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {displayName}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                {formatDate(project.deadline)}
            </td>
            <td className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-white">
                {formatCurrency(project.budget)}
            </td>

            <td className="px-6 py-4 text-right">
                <div className="relative inline-block text-left">
                    <button
                        ref={buttonRef}
                        onClick={handleMenuToggle}
                        className={`p-1 rounded-md transition-colors ${isMenuOpen ? 'bg-slate-200 dark:bg-slate-700 text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    >
                        <span className="material-icons">more_vert</span>
                    </button>

                    {isMenuOpen && createPortal(
                        <div
                            ref={menuRef}
                            className="fixed z-50 w-36 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                            style={{ top: `${menuPosition.top}px`, right: `${menuPosition.right}px` }}
                        >
                            <div className="py-1 text-left">
                                <button
                                    onClick={() => { setIsMenuOpen(false); onEdit(); }}
                                    disabled={isDeleting}
                                    className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                                >
                                    <span className="material-icons text-base mr-3 text-slate-400">edit</span>Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                                >
                                    <span className="material-icons text-base mr-3">delete_outline</span>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>,
                        document.body
                    )}
                </div>
            </td>
        </tr>
    );
}