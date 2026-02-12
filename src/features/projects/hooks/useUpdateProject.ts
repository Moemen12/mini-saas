import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../services/project.service";
import { CreateProjectFields } from "../schemas/project-schema";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateProjectFields }) =>
            updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["projectStats"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
    });
}
