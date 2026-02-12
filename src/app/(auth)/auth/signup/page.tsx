import { Metadata } from "next";
import { SignupForm } from "@/features/auth";

export const metadata: Metadata = {
    title: "Signup",
    description: "Create an account to start using our SaaS platform and manage your projects efficiently.",
};


export default function SignUpPage() {
    return <SignupForm />;
}
