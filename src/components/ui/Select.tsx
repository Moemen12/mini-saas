import React, { useId } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = "", id: providedId, ...props }, ref) => {
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
                <select
                    id={id}
                    ref={ref}
                    className={`block w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white disabled:opacity-50 transition-all duration-200 ${
                        error ? "border-red-500 focus:ring-red-500" : ""
                    } ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1.5 text-xs text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";
