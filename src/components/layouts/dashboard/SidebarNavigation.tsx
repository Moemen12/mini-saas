// components/layouts/dashboard/SidebarNavigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    name: string;
    href: string;
    icon: string;
}

interface SidebarNavigationProps {
    navigation: NavItem[];
    account: NavItem[];
}

export function SidebarNavigation({ navigation, account }: Readonly<SidebarNavigationProps>) {
    const pathname = usePathname();

    const renderNavLink = (item: NavItem) => {
        const isActive = pathname === item.href;
        const linkClasses = isActive
            ? "bg-primary/10 text-primary"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white";

        const iconClasses = isActive
            ? "text-primary"
            : "text-slate-400 group-hover:text-primary";

        return (
            <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors rounded-lg group ${linkClasses}`}
            >
                <span className={`material-icons mr-3 text-xl ${iconClasses}`}>
                    {item.icon}
                </span>
                {item.name}
            </Link>
        );
    };

    return (
        <nav className="flex-1 px-4 mt-4 space-y-1">
            {navigation.map(renderNavLink)}

            <div className="pt-4 pb-2">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Account
                </p>
            </div>

            {account.map(renderNavLink)}
        </nav>
    );
}