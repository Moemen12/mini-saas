
import { useMutation } from "@tanstack/react-query"
import { SigninFields } from "../types"

export function useSignin() {
    return useMutation({
        mutationFn: async (credentials: SigninFields) => {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || "Sign in failed")
            }

            return response.json()
        },
    })
}