import { NextRequest, NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/withErrorHandling";
import { withValidation } from "@/lib/api/withValidation";
import { createProjectSchema } from "@/features/projects/schemas/project-schema";
import { getAuthUser } from "@/lib/api/auth-utils";
import { createAdminClient } from "@/lib/supabase/admin";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const validationResult = await withValidation(createProjectSchema)(request);
    if (validationResult instanceof NextResponse) return validationResult;

    const { user, supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;
    const { assigned_to, ...data } = validationResult.data;
    if (assigned_to === user.id) {
        return NextResponse.json({ error: "Cannot assign project to yourself" }, { status: 400 });
    }
    const { data: newProject, error } = await supabase
        .from('projects')
        .insert({
            ...data,
            assigned_to: assigned_to || null,
            user_id: user.id,
        })
        .select()
        .single();

    if (error) throw error;
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
});
export const GET = withErrorHandling(async () => {
    const { supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;
    const { data: userProjects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    const admin = createAdminClient();
    const { data: { users } } = await admin.auth.admin.listUsers();

    const userMap = Object.fromEntries(users.map(u => [u.id, u.email]));
    const projectsWithUserEmails = userProjects.map(project => ({
        ...project,
        assignedToId: project.assigned_to,
        assignedTo: project.assigned_to ? userMap[project.assigned_to] : null
    }));

    return NextResponse.json(projectsWithUserEmails);
});

export const PUT = withErrorHandling(async (request: NextRequest) => {
    const validationResult = await withValidation(createProjectSchema)(request);
    if (validationResult instanceof NextResponse) return validationResult;

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    const { user, supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;

    const { assigned_to, ...data } = validationResult.data;

    if (assigned_to === user.id) {
        return NextResponse.json(
            { error: "Cannot assign project to yourself" },
            { status: 400 }
        );
    }

    const { data: updatedProject, error } = await supabase
        .from("projects")
        .update({
            ...data,
            assigned_to: assigned_to || null,
        })
        .eq("id", projectId)
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) throw error;

    if (!updatedProject) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        project: updatedProject,
    });
});


export const DELETE = withErrorHandling(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    const { user, supabase, response: authErrorResponse } = await getAuthUser();
    if (authErrorResponse) return authErrorResponse;


    const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId)
        .eq("user_id", user.id)
        .select();

    if (error) throw error;

    if (!data || data.length === 0) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
});
