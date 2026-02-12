import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../services/project.service";

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["projectStats"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
    });
}
