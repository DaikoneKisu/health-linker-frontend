import { useQuery } from "@tanstack/react-query";
import { getRuralsAdmin, getSpecialistsAdmin } from "../../api/admin";

export function useSpecialistAdmins(query: string) {
  return useQuery({
    queryKey: ["specialists", { admin: true, query }],
    queryFn: () => getSpecialistsAdmin(query),
    networkMode: "offlineFirst",
  });
}

export function useRuralProfessionalsAdmins(query: string) {
  return useQuery({
    queryKey: ["rural-professionals", { admin: true, query }],
    queryFn: () => getRuralsAdmin(query),
    networkMode: "offlineFirst",
  });
}
