import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/stats.service";

export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardStats,
        staleTime: 1000 * 60 * 2,
    });
}