import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(10, "Project name must be at least 10 characters").max(50, "Project name must be at most 50 characters"),
    status: z.enum(["active", "on hold", "completed"]),
    deadline: z
        .string()
        .min(1, "Deadline is required")
        .refine((val) => !Number.isNaN(Date.parse(val)), {
            message: "Invalid date",
        })
        .refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
            message: "Deadline cannot be in the past",
        }),

    assigned_to: z.union([
        z.literal(""),
        z.uuid("Please select a valid team member")
    ]),
    budget: z.number().min(0).max(1000000),
});

export type CreateProjectFields = z.infer<typeof createProjectSchema>;
