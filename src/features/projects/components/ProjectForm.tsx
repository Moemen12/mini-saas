'use client'

import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, CreateProjectFields } from "../schemas/project-schema";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useUsers } from "../hooks/useUsers";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useUser } from "@/features/auth";
import { Project } from "@/db/drizzle/schema/projects";

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
    
    // Filter out current user from assignment options
    const otherUsers = useMemo(() => 
        users.filter(u => u.id !== currentUser?.id),
    [users, currentUser?.id]);

    const isPending = isCreating || isUpdating;
    const serverError = createError || updateError;

    // Determine the initial assigned_to value
    // We check both assignedToId (from API) and assigned_to (from DB schema)
    const initialAssignedTo = useMemo(() => {
        if (!project) return "";
        const p = project as any;
        return p.assignedToId || p.assigned_to || "";
    }, [project]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<CreateProjectFields>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: project?.name ?? "",
            status: project?.status ?? "active",
            deadline: project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
            assigned_to: initialAssignedTo,
            budget: project?.budget ? Number(project.budget) : 0,
        },
    });

    // Update form values when project or users change to ensure correct data is shown
    useEffect(() => {
        if (project) {
            const formData = {
                name: project.name,
                status: project.status,
                deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
                assigned_to: initialAssignedTo,
                budget: Number(project.budget),
            };
            reset(formData);
        } else {
            reset({
                name: "",
                status: "active",
                deadline: "",
                assigned_to: "",
                budget: 0,
            });
        }
    }, [project, initialAssignedTo, reset, usersLoading]);

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

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "on hold", label: "On Hold" },
        { value: "completed", label: "Completed" },
    ];

    const userOptions = [
        { value: "", label: "Unassigned" },
        ...otherUsers.map((user) => ({
            value: user.id,
            label: user.email.split("@")[0],
        })),
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Project Name"
                placeholder="e.g. Website Redesign"
                error={errors.name?.message}
                {...register("name")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Status"
                    options={statusOptions}
                    error={errors.status?.message}
                    {...register("status")}
                />

                <Input
                    label="Deadline"
                    type="date"
                    error={errors.deadline?.message}
                    {...register("deadline")}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Assigned To"
                    options={userOptions}
                    disabled={usersLoading}
                    error={errors.assigned_to?.message}
                    {...register("assigned_to")}
                />

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


