import Link from "next/link";

interface AuthFooterProps {
    text: string;
    linkText: string;
    linkHref: string;
}

export function AuthFooter({ text, linkText, linkHref }: Readonly<AuthFooterProps>) {
    return (
        <div className="mt-8">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                {text}{" "}
                <Link
                    href={linkHref}
                    className="font-bold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                >
                    {linkText}
                </Link>
            </p>
        </div>
    );
}