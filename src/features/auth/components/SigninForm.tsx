"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { signinSchema } from "../schemas/signin-schema"
import { useSignin } from "../hooks/useSignin"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { AuthFooter } from "./shared/AuthFooter"
import { SigninFields } from "../types"
import { ROUTES } from "@/config/routes"
import { ErrorAlert } from "./shared/ErrorAlert"

export function SigninForm() {
    const router = useRouter()
    const { mutate, isPending, error: serverError } = useSignin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signinSchema),
    })

    const onSubmit = (data: SigninFields) => {
        mutate(data, {
            onSuccess: () => {
                router.push(ROUTES.DASHBOARD)
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
            />

            {serverError && <ErrorAlert message={serverError.message} />}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Signing In...' : 'Sign In'}
            </Button>

            <AuthFooter
                text="Don't have an account?"
                linkText="Create an account"
                linkHref={ROUTES.AUTH.SIGNUP}
            />
        </form>
    )
}