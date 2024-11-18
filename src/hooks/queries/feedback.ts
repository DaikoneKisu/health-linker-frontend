import { useQuery } from "@tanstack/react-query";
import { getCaseFeedback } from "../../api/feedback";

export function useCaseFeedback(id: number) {
  return useQuery({
    queryKey: ["feedback", { caseId: id }],
    queryFn: () => getCaseFeedback(id),
    staleTime: 1000 * 60 * 5,
  });
}
