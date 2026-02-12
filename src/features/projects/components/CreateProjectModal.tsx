import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Project } from "@/db/drizzle/schema/projects";
import { ProjectForm } from "./ProjectForm";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: Project | null;
}

export function ProjectModal({ isOpen, onClose, project }: Readonly<ProjectModalProps>) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={project ? "Edit Project" : "Create New Project"}
        >
            <ProjectForm
                key={project?.id ?? 'new'}
                project={project}
                onSuccess={onClose}
                onCancel={onClose}
            />
        </Dialog>
    );
}