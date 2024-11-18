import { useQuery } from "@tanstack/react-query";
import { getResources } from "../../api/recursos-educativos";

export function useResources(query: string) {
  return useQuery({
    queryKey: ["educational-resources", { query }],
    queryFn: () => getResources(query),
  });
}
