import { ROUTES } from '@/config/routes';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4 text-center">
            <div className="space-y-4">
                <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-800 select-none">
                    404
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">
                        Page Not Found
                    </h2>
                </div>
            </div>

            <p className="mt-8 text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>

            <Link
                href={ROUTES.DASHBOARD}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            ><span className="material-icons mr-2 text-sm">home</span>Back to Home</Link>
        </div>
    );
}
