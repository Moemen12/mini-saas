import { apiRequest } from "@/lib/api/apiClient";

export interface User {
    id: string;
    email: string;
}

export async function fetchUsers() {
    return apiRequest<User[]>("/api/users", "GET");
}
