import { useQuery } from "@tanstack/react-query";
import {
  getClosedCasesCurrentAdmin,
  getClosedCasesCurrentUser,
  getOpenCasesCurrentAdmin,
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

export function useOpenCasesCurrentAdmin({
  page = 1,
  size = 100,
  currentSearch = "",
  email = "",
  enabled = false,
}) {
  return useQuery({
    queryKey: ["clinical-cases", "open", { page, size, currentSearch, email }],
    queryFn: () => getOpenCasesCurrentAdmin(page, size, currentSearch),
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

export function useClosedCasesCurrentAdmin({
  page = 1,
  size = 100,
  currentSearch = "",
  email = "",
  enabled = false,
}) {
  return useQuery({
    queryKey: [
      "clinical-cases",
      "closed",
      { page, size, currentSearch, email },
    ],
    queryFn: () => getClosedCasesCurrentAdmin(page, size, currentSearch),
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
