'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, CreateProjectFields } from "../schemas/project-schema";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useUsers } from "../hooks/useUsers";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/features/auth";
import { Project } from "@/db/drizzle/schema/projects";
import { useMemo, useEffect } from "react";

interface ProjectFormProps {
    project?: Project | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ProjectForm({ project, onSuccess, onCancel }: Readonly<ProjectFormProps>) {
    const { mutate: createProject, isPending: isCreating, error: createError } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating, error: updateError } = useUpdateProject();
    const { data: users = [], isLoading: usersLoading } = useUsers();
    const { data: currentUser } = useUser();
    const otherUsers = useMemo(() =>
        users.filter(u => u.id !== currentUser?.id),
        [users, currentUser?.id]
    );

    const isPending = isCreating || isUpdating;
    const serverError = createError || updateError;
    const projectWithIds = project as (Project & { assignedToId?: string | null });
    const assignedId = projectWithIds?.assignedToId ?? "";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateProjectFields>({
        resolver: zodResolver(createProjectSchema),
        values: useMemo(() => {
            if (!project) return {
                name: "",
                status: "active",
                deadline: "",
                assigned_to: "",
                budget: 0,
            };

            return {
                name: project.name,
                status: project.status,
                deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
                assigned_to: assignedId,
                budget: Number(project.budget),
            };
        }, [project, assignedId]),
    });

    useEffect(() => {
        if (!usersLoading && assignedId) {
            reset(prev => ({
                ...prev,
                assigned_to: assignedId
            }));
        }
    }, [usersLoading, assignedId, reset]);

    const onSubmit = (data: CreateProjectFields) => {
        if (project) {
            updateProject({ id: project.id, data }, {
                onSuccess: () => {
                    onSuccess();
                },
            });
        } else {
            createProject(data, {
                onSuccess: () => {
                    onSuccess();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Project Name"
                placeholder="e.g. Website Redesign"
                error={errors.name?.message}
                {...register("name")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <label htmlFor="project-status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Status
                    </label>
                    <select
                        id="project-status"
                        {...register("status")}
                        className="block w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white"
                    >
                        <option value="active">Active</option>
                        <option value="on hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors.status && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.status.message}</p>
                    )}
                </div>

                <Input
                    label="Deadline"
                    type="date"
                    error={errors.deadline?.message}
                    {...register("deadline")}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <label htmlFor="assigned-to" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Assigned To
                    </label>
                    <select
                        id="assigned-to"
                        {...register("assigned_to")}
                        disabled={usersLoading}
                        className="block w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white disabled:opacity-50"
                    >
                        <option value="">Unassigned</option>
                        {otherUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email.split("@")[0]}
                            </option>
                        ))}
                    </select>
                    {errors.assigned_to && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.assigned_to.message}</p>
                    )}
                </div>

                <Input
                    label="Budget ($)"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    error={errors.budget?.message}
                    {...register("budget", { valueAsNumber: true })}
                />
            </div>

            {serverError && (
                <div className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <span className="material-icons text-base mt-0.5">error_outline</span>
                    <span>{serverError.message}</span>
                </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button type="button" variant="secondary" onClick={onCancel} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isPending} disabled={isPending}>
                    {project ? "Save Changes" : "Create Project"}
                </Button>
            </div>
        </form>
    );
}
