import React, { useId } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Checkbox({ label, className = "", id: providedId, ...props }: Readonly<CheckboxProps>) {
    const generatedId = useId();
    const id = providedId || generatedId;

    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className={`h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-700 rounded transition-colors cursor-pointer ${className}`}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                    {label}
                </label>
            )}
        </div>
    );
}
