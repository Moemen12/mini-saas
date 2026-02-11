import { apiRequest } from "@/lib/api/apiClient";
import { DashboardStats } from "../types";

export async function fetchDashboardStats(): Promise<DashboardStats> {
    return apiRequest<DashboardStats>("/api/stats", "GET");
}