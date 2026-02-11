export interface DashboardStats {
    overview: {
        total: number;
        active: number;
        onHold: number;
        completed: number;
        completionRate: number;
    };
    budget: {
        total: number;
        spent: number;
        allocated: number;
        average: number;
    };
    timeline: {
        dueToday: number;
        upcoming: number;
        overdue: number;
    };
    team: {
        members: Array<{
            id: string;
            name: string;
            email: string;
            projectCount: number;
            activeCount: number;
            completedCount: number;
        }>;
        totalMembers: number;
        mostBusy: any;
    };
    trends: {
        createdThisMonth: number;
        growthRate: number;
    };
}