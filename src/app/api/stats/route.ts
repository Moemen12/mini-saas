import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/withErrorHandling";
import { getAuthUser } from "@/lib/api/auth-utils";
import { createAdminClient } from "@/lib/supabase/admin";
import {
    startOfMonth,
    subMonths,
    isAfter,
    isBefore,
    isSameDay,
    addDays
} from "date-fns";

export const GET = withErrorHandling(async () => {
    // 1. Authenticate the request
    const { supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;

    // 2. Fetch projects (Standard Client)
    const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*');

    if (projectsError) throw projectsError;

    // 3. Initialize Admin Client and fetch users (Admin Power)
    // We don't put createAdminClient in Promise.all because it's not a Promise
    const admin = createAdminClient();
    const { data: authData, error: authError } = await admin.auth.admin.listUsers();

    if (authError) throw authError;

    // 4. Guaranteed Data Arrays (Fixes 'Possibly Null' TS errors)
    const projects = projectsData ?? [];
    const authUsers = authData.users ?? [];

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));

    // --- 1. Project Overview Metrics ---
    const total = projects.length;
    const active = projects.filter(p => p.status === 'active').length;
    const onHold = projects.filter(p => p.status === 'on hold').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // --- 2. Budget Metrics ---
    const parseB = (val: string | null | undefined) => Number.parseFloat(val || "0");
    const totalBudget = projects.reduce((sum, p) => sum + parseB(p.budget), 0);
    const spentBudget = projects
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + parseB(p.budget), 0);
    const allocatedBudget = projects
        .filter(p => p.status !== 'completed')
        .reduce((sum, p) => sum + parseB(p.budget), 0);

    // --- 3. Timeline Metrics ---
    const dueToday = projects.filter(p =>
        p.deadline && isSameDay(new Date(p.deadline), now)
    ).length;

    const upcoming = projects.filter(p =>
        p.deadline &&
        p.status !== 'completed' &&
        isAfter(new Date(p.deadline), now) &&
        isBefore(new Date(p.deadline), addDays(now, 30))
    ).length;

    const overdue = projects.filter(p =>
        p.deadline &&
        p.status !== 'completed' &&
        isBefore(new Date(p.deadline), now)
    ).length;

    // --- 4. Team Metrics ---
    const teamStats = authUsers
        .map(u => {
            const memberProjects = projects.filter(p => p.assigned_to === u.id);
            return {
                id: u.id,
                name: u.user_metadata?.full_name || u.email?.split('@')[0],
                email: u.email,
                projectCount: memberProjects.length,
                activeCount: memberProjects.filter(p => p.status === 'active').length,
                completedCount: memberProjects.filter(p => p.status === 'completed').length,
            };
        })
        .filter(m => m.projectCount > 0)
        .sort((a, b) => b.projectCount - a.projectCount);

    // --- 5. Trend Metrics ---
    const createdThisMonth = projects.filter(p =>
        isAfter(new Date(p.created_at), thisMonthStart)
    ).length;

    const createdLastMonth = projects.filter(p =>
        isAfter(new Date(p.created_at), lastMonthStart) &&
        isBefore(new Date(p.created_at), thisMonthStart)
    ).length;

    const growthRate = createdLastMonth > 0
        ? Math.round(((createdThisMonth - createdLastMonth) / createdLastMonth) * 100)
        : 100;

    // 5. Final Response
    return NextResponse.json({
        overview: { total, active, onHold, completed, completionRate },
        budget: {
            total: totalBudget,
            spent: spentBudget,
            allocated: allocatedBudget,
            average: total > 0 ? totalBudget / total : 0
        },
        timeline: { dueToday, upcoming, overdue },
        team: {
            members: teamStats,
            totalMembers: teamStats.length,
            mostBusy: teamStats[0] || null
        },
        trends: { createdThisMonth, growthRate }
    });
});