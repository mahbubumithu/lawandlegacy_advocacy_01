import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteContent(section: string) {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .eq("section", section);
      if (error) throw error;
      const content: Record<string, any> = {};
      data?.forEach((row) => {
        content[row.key] = row.value;
      });
      return content;
    },
    staleTime: 1000 * 60 * 5,
  });
}
