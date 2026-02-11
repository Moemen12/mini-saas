import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function useUser() {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            const supabase = createClient();
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return null;
            return user;
        },
        staleTime: Infinity,
    });
}