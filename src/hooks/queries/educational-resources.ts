import { useQuery } from "@tanstack/react-query";
import { getResource, getResources } from "../../api/recursos-educativos";

export function useResources(query: string) {
  return useQuery({
    queryKey: ["educational-resources", { query }],
    queryFn: () => getResources(query),
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ["educational-resources", { id }],
    queryFn: () => getResource(id),
  });
}
