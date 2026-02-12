import { apiRequest } from "@/lib/api/apiClient";
import { CreateProjectFields } from "../schemas/project-schema";
import { Project } from "@/db/drizzle/schema/projects";
import { ProjectStats } from "../types";

export async function createProject(data: CreateProjectFields) {
    return apiRequest("/api/projects", "POST", data);
}

export async function fetchProjects() {
    return apiRequest<Project[]>("/api/projects", "GET");
}

export async function fetchProjectStats() {
    return apiRequest<ProjectStats>("/api/projects/stats", "GET");
}

export async function updateProject(id: string, data: CreateProjectFields) {
    return apiRequest(`/api/projects?id=${id}`, "PUT", data);
}

export async function deleteProject(id: string) {
    return apiRequest(`/api/projects?id=${id}`, "DELETE");
}
