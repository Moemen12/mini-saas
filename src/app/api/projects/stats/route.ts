import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/withErrorHandling";
import { getAuthUser } from "@/lib/api/auth-utils";

export const GET = withErrorHandling(async () => {
    const { supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;
    const { data: userProjects, error } = await supabase
        .from('projects')
        .select('*');

    if (error) throw error;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const totalProjects = userProjects.length;

    const activeDeadlines = userProjects.filter(project => {
        if (!project.deadline) return false;
        const deadline = new Date(project.deadline);
        return deadline >= today && deadline <= nextWeek;
    }).length;


    const totalBudget = userProjects.reduce((sum, project) => {
        return sum + Number.parseFloat(project.budget || "0");
    }, 0);


    const activeBudget = userProjects
        .filter(project => project.status === "active")
        .reduce((sum, project) => {
            return sum + Number.parseFloat(project.budget || "0");
        }, 0);

    const budgetUsedPercentage = totalBudget > 0
        ? Math.round((activeBudget / totalBudget) * 100)
        : 0;

    return NextResponse.json({
        totalProjects,
        activeDeadlines,
        totalBudget,
        activeBudget,
        budgetUsedPercentage,
    });
});