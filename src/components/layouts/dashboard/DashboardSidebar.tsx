"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { name: 'Projects', href: '#', icon: 'assignment' },
    { name: 'Team', href: '#', icon: 'groups' },
    { name: 'Analytics', href: '#', icon: 'insights' },
];

const account = [
    { name: 'Settings', href: '#', icon: 'settings' },
    { name: 'Support', href: '#', icon: 'help_outline' },
];

interface DashboardSidebarProps {
    readonly isOpen?: boolean;
    readonly onClose?: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
      flex flex-col h-full shrink-0 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <span className="material-icons text-white text-xl">layers</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ProFlow</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                    aria-label="Close sidebar"
                >
                    <span className="material-icons">close</span>
                </button>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors rounded-lg group ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            <span className={`material-icons mr-3 text-xl ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                }`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    );
                })}

                <div className="pt-4 pb-2">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
                </div>

                {account.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors rounded-lg group ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            <span className={`material-icons mr-3 text-xl ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                }`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <Image
                        alt="User"
                        className="w-9 h-9 rounded-full bg-slate-200"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVDkrleaUd7GFSaViMiFBrKv_u4iPXLoM__lrQ86JgMwGv7yDHmyGWlPPxGC7ShIeCb_DgJf6tv4CaMN8RjVU9DfMxPNS31RaOA5n4GawSjHM_JBwourzlD3vQQ9fZ78IxyxlLFg9H8lJZcJqcxI1QEmmJ9kw0t_UhRCXhLIeNKbeeAfXEm603u0BprWFV26PMASeToQ0ExkPRtd42UWydMThDkyR24uRann9X6DoF4ovcCd_9IlRc3GiTsQ5k3-1wsrGic4vPtQQ"
                        width={36}
                        height={36}
                    />
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Alex Thompson</p>
                        <p className="text-xs text-slate-500 truncate">alex@proflow.so</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
