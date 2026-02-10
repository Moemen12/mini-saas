import { useMutation } from "@tanstack/react-query"
import { SignupFields } from "../types"
import { apiRequest } from "@/lib/api/apiClient"

export function useSignup() {
    return useMutation({
        mutationFn: async (credentials: SignupFields) => {
            const response = await apiRequest("/api/auth/signup", "POST", credentials)
            return response
        },
    })
}