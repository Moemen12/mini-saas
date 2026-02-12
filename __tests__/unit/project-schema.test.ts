import { describe, it, expect } from 'vitest';
import { createProjectSchema } from '@/features/projects/schemas/project-schema';

describe('createProjectSchema', () => {
    const getTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const getYesterday = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    };

    it('should validate a correct project payload', () => {
        const validProject = {
            name: 'A valid project name',
            status: 'active',
            deadline: getTomorrow(),
            assigned_to: 'a1b2c3d4-e5f6-4789-a234-567890abcdef',
            budget: 1000,
        };
        const result = createProjectSchema.safeParse(validProject);
        expect(result.success).toBe(true);
    });

    it('should fail if the project name is too short', () => {
        const invalidProject = {
            name: 'short',
            status: 'active',
            deadline: getTomorrow(),
            assigned_to: 'a1b2c3d4-e5f6-4789-1234-567890abcdef',
            budget: 1000,
        };
        const result = createProjectSchema.safeParse(invalidProject);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error?.issues[0].message).toContain('at least 10 characters');
        }
    });

    it('should fail if the deadline is in the past', () => {
        const invalidProject = {
            name: 'A project with a past deadline',
            status: 'active',
            deadline: getYesterday(),
            assigned_to: 'a1b2c3d4-e5f6-4789-1234-567890abcdef',
            budget: 1000,
        };
        const result = createProjectSchema.safeParse(invalidProject);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error?.issues[0].message).toContain('cannot be in the past');
        }
    });

    it('should fail if assigned_to is not a valid UUID', () => {
        const invalidProject = {
            name: 'A project with invalid assignee',
            status: 'active',
            deadline: getTomorrow(),
            assigned_to: 'not-a-uuid',
            budget: 1000,
        };
        const result = createProjectSchema.safeParse(invalidProject);
        expect(result.success).toBe(false);
        if (!result.success) {
            const uuidError = result.error?.issues.find(issue => issue.message.includes('valid team member'));
            expect(uuidError).toBeDefined();
            expect(uuidError?.message).toContain('Please select a valid team member');
        }
    });
});
