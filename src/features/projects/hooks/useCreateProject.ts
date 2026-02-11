import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/project.service";
import { CreateProjectFields } from "../schemas/project-schema";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProjectFields) => createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["projectStats"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
    });
}
