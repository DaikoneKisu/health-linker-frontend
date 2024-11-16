import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "../../api/register";

export function useSpecialities() {
  return useQuery({
    queryKey: ["specialities"],
    queryFn: getSpecialities,
    networkMode: "offlineFirst",
  });
}
