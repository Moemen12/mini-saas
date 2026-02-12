import { Metadata } from "next";
import { SigninForm } from "@/features/auth";

export const metadata: Metadata = {
    title: "Signin",
    description: "Sign in to your account to access the dashboard and manage your projects.",
};


export default function SigninPage() {
    return <SigninForm />;
}
