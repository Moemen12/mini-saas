import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className = "",
    id: providedId,
    ...props
}: Readonly<InputProps>) {
    const generatedId = useId();
    const id = providedId || generatedId;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    className={`block w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-slate-400 outline-none ${error ? "border-red-500 focus:ring-red-500" : ""
                        } ${className}`}
                    {...props}
                />
            </div>
            {(error || helperText) && (
                <p
                    className={`mt-1.5 text-xs ${error ? "text-red-500" : "text-slate-500 dark:text-slate-400"
                        }`}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    );
}
