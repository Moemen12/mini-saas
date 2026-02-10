import { useMutation } from "@tanstack/react-query"
import { SignupFields } from "../types"

export function useSignup() {
    return useMutation({
        mutationFn: async (credentials: SignupFields) => {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
                credentials: "include",
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || "Sign up failed")
            }

            return response.json()
        },
    })
}