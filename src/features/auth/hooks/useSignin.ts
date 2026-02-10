
import { useMutation } from "@tanstack/react-query"
import { SigninFields } from "../types"
import { apiRequest } from "@/lib/api/apiClient"

export function useSignin() {
    return useMutation({
        mutationFn: async (credentials: SigninFields) => {
            const response = await apiRequest("/api/auth/signin", "POST", credentials)
            return response
        },
    })
}