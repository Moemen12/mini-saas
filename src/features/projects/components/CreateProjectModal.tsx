import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { CreateProjectForm } from "./CreateProjectForm";

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: Readonly<CreateProjectModalProps>) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Project"
        >
            <CreateProjectForm
                onSuccess={onClose}
                onCancel={onClose}
            />
        </Dialog>
    );
}
