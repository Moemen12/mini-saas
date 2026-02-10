import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading,
    ...props
}: Readonly<ButtonProps>) {
    const baseStyles =
        "flex justify-center items-center font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-primary text-white border border-transparent shadow-sm hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/20",
        secondary:
            "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700",
        outline:
            "bg-transparent text-primary border border-primary hover:bg-primary/10",
    };

    const sizes = {
        sm: "px-3 py-2 text-xs rounded",
        md: "px-4 py-2.5 text-sm rounded-lg",
        lg: "px-6 py-3.5 text-base rounded-xl",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="material-icons animate-spin mr-2">refresh</span>
            ) : null}
            {children}
        </button>
    );
}
