import { useUser } from "@/features/auth";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { UserProfileSkeleton } from "./UserProfileSkeleton";
import { User } from "@supabase/auth-js";
import { ROUTES } from "@/config/routes";

const navigation = [
    { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'dashboard' },
    { name: 'Projects', href: ROUTES.PROJECTS, icon: 'assignment' },
    { name: 'Team', href: ROUTES.TEAM, icon: 'groups' },
    { name: 'Analytics', href: ROUTES.ANALYTICS, icon: 'insights' },
];

const account = [
    { name: 'Settings', href: ROUTES.SETTINGS, icon: 'settings' },
    { name: 'Support', href: ROUTES.SUPPORT, icon: 'help_outline' },
];

interface DashboardSidebarProps {
    readonly isOpen?: boolean;
    readonly onClose?: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const { data: user, isLoading } = useUser();
    const sidebarClasses = getSidebarClasses(isOpen);

    return (
        <aside className={sidebarClasses}>
            <SidebarHeader onClose={onClose} />

            <SidebarNavigation navigation={navigation} account={account} />

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                {renderUserProfile(user!, isLoading)}
            </div>
        </aside>
    );
}

function getSidebarClasses(isOpen?: boolean): string {
    const baseClasses = "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto";
    const transformClasses = isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0";
    return `${baseClasses} ${transformClasses}`;
}

function renderUserProfile(user: User | null, isLoading: boolean) {
    if (isLoading) return <UserProfileSkeleton />;
    if (user) return <UserProfileDropdown user={user} />;
    return null;
}