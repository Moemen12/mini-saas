import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: (failureCount, error) => {
                const isHttpError = (err: Error): err is Error & {
                    response?: { status: number }
                } => {
                    return 'response' in err;
                };

                if (isHttpError(error) && error.response) {
                    const status = error.response.status;
                    if (status >= 400 && status < 500) {
                        return false;
                    }
                }
                return failureCount < 2;
            },
            refetchOnWindowFocus: false,
        },
    },
});