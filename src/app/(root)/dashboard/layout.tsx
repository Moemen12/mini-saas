
import { DashboardLayoutClient } from "@/components/layouts/dashboard/DashboardLayoutClient"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard | ProFlow",
    description: "Manage your projects and team",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}