import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { ROUTES } from "@/config/routes";

interface UserProfileDropdownProps {
    user: User;
}

export function UserProfileDropdown({ user }: Readonly<UserProfileDropdownProps>) {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push(ROUTES.AUTH.SIGNIN);
        router.refresh();
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const userInitials = user.email?.substring(0, 2).toUpperCase();
    const userName = user.user_metadata.name;
    const chevronRotation = isDropdownOpen ? "rotate-180" : "";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center w-full p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0 transition-colors duration-200">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 tracking-tight">
                        {userInitials}
                    </span>
                </div>
                <div className="ml-3 overflow-hidden flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {userName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <span className={`material-icons text-slate-400 transition-transform ${chevronRotation}`}>
                    expand_more
                </span>
            </button>

            {isDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
                    <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={closeDropdown}
                    >
                        <span className="material-icons mr-3 text-slate-400">person</span>Profile
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={closeDropdown}
                    >
                        <span className="material-icons mr-3 text-slate-400">settings</span> Settings
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-700" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <span className="material-icons mr-3">logout</span>Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}