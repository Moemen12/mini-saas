'use client';

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function QueryClientProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
