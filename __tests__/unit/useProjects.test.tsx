import React from 'react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProjects } from '@/features/projects/hooks/useProjects';
import * as projectService from '@/features/projects/services/project.service';


vi.mock('@/features/projects/services/project.service', () => ({
    fetchProjects: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useProjects', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch projects successfully', async () => {
        const mockProjects = [
            { id: '1', name: 'Project A', status: 'active', deadline: '2026-03-01', assignedTo: 'user1', assignedToId: 'user1-id', budget: '100' },
            { id: '2', name: 'Project B', status: 'completed', deadline: '2026-02-01', assignedTo: 'user2', assignedToId: 'user2-id', budget: '200' },
        ];
        (projectService.fetchProjects as Mock).mockResolvedValue(mockProjects);

        const { result } = renderHook(() => useProjects(), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockProjects);
        expect(projectService.fetchProjects).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error', async () => {
        const errorMessage = 'Failed to fetch projects';
        (projectService.fetchProjects as Mock).mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useProjects(), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe(errorMessage);
        expect(projectService.fetchProjects).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no projects are fetched', async () => {
        (projectService.fetchProjects as Mock).mockResolvedValue([]);

        const { result } = renderHook(() => useProjects(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual([]);
    });
});
