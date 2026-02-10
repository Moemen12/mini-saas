"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { signupSchema } from "../schemas/signup-schema"
import { useSignup } from "../hooks/useSignup"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { AuthFooter } from "./shared/AuthFooter"
import { SignupFields } from "../types"
import { ROUTES } from "@/config/routes"
import { ErrorAlert } from "./shared/ErrorAlert"

export function SignupForm() {
    const router = useRouter()
    const { mutate, isPending, error: serverError } = useSignup()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = (data: SignupFields) => {
        mutate(data, {
            onSuccess: () => {
                router.push("/auth/signin?message=Check your email to verify")
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                error={errors.name?.message}
            />

            <Input
                label="Email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
            />

            <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />

            {serverError && <ErrorAlert message={serverError.message} />}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <AuthFooter
                text="Already have an account?"
                linkText="Sign in"
                linkHref={ROUTES.AUTH.SIGNIN}
            />
        </form>
    )
}