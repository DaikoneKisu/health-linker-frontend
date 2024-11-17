import { useQuery } from "@tanstack/react-query";
import {
  getAdmin,
  getAdmins,
  getRural,
  getRuralsAdmin,
  getSpecialist,
  getSpecialistsAdmin,
} from "../../api/admin";

export function useSpecialistAdmins(query: string) {
  return useQuery({
    queryKey: ["specialists", { admin: true, query }],
    queryFn: () => getSpecialistsAdmin(query),
  });
}

export function useRuralProfessionalsAdmins(query: string) {
  return useQuery({
    queryKey: ["rural-professionals", { admin: true, query }],
    queryFn: () => getRuralsAdmin(query),
  });
}

export function useAdmins(query: string) {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(query),
  });
}

export function useSpecialist(document: string) {
  return useQuery({
    queryKey: ["specialist", document],
    queryFn: () => getSpecialist(document),
  });
}

export function useRuralProfessional(document: string) {
  return useQuery({
    queryKey: ["rural-professional", document],
    queryFn: () => getRural(document),
  });
}

export function useAdmin(email: string) {
  return useQuery({
    queryKey: ["admins", email],
    queryFn: () => getAdmin(email),
  });
}
