import { useQuery } from "@tanstack/react-query";
import {
  getClosedCasesCurrentUser,
  getOpenCasesCurrentUser,
  getRequiredCurrentSpecialistCases,
} from "../../api/casos-clinicos";

export function useOpenCasesCurrentUser({
  page = 1,
  size = 100,
  currentSearch = "",
  document = "",
  enabled = false,
}) {
  return useQuery({
    queryKey: [
      "clinical-cases",
      "open",
      { page, size, currentSearch, document },
    ],
    queryFn: () => getOpenCasesCurrentUser(page, size, currentSearch),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });
}

export function useClosedCasesCurrentUser({
  page = 1,
  size = 100,
  currentSearch = "",
  document = "",
  enabled = false,
}) {
  return useQuery({
    queryKey: [
      "clinical-cases",
      "closed",
      { page, size, currentSearch, document },
    ],
    queryFn: () => getClosedCasesCurrentUser(page, size, currentSearch),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });
}

export function useRequiredCurrentSpecialistCases({
  page = 1,
  size = 100,
  currentSearch = "",
  document = "",
  enabled = false,
}) {
  return useQuery({
    queryKey: [
      "clinical-cases",
      "specialist",
      { page, size, currentSearch, document },
    ],
    queryFn: () => getRequiredCurrentSpecialistCases(page, size, currentSearch),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}
