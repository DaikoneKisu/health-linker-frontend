import { useQuery } from "@tanstack/react-query";
import {
  getAdmin,
  getAdmins,
  getRural,
  getRuralsAdmin,
  getSpecialist,
  getSpecialistBySpeciality,
  getSpecialistsAdmin,
} from "../../api/admin";

export function useSpecialistAdmins(query: string) {
  return useQuery({
    queryKey: ["specialists", { admin: true, query }],
    queryFn: () => getSpecialistsAdmin(query),
    networkMode: "online",
  });
}

export function useSpecialistsBySpeciality({
  search,
  specialityId,
}: {
  search: string;
  specialityId: number;
}) {
  return useQuery({
    queryKey: ["specialists", { admin: true, query: search, specialityId }],
    queryFn: () => getSpecialistBySpeciality(search, specialityId),
    networkMode: "online",
    enabled: specialityId !== 0,
  });
}

export function useRuralProfessionalsAdmins(query: string) {
  return useQuery({
    queryKey: ["rural-professionals", { admin: true, query }],
    queryFn: () => getRuralsAdmin(query),
    networkMode: "online",
  });
}

export function useAdmins(query: string) {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(query),
    networkMode: "online",
  });
}

export function useSpecialist(document: string) {
  return useQuery({
    queryKey: ["specialist", document],
    queryFn: () => getSpecialist(document),
    networkMode: "online",
  });
}

export function useRuralProfessional(document: string) {
  return useQuery({
    queryKey: ["rural-professional", document],
    queryFn: () => getRural(document),
    networkMode: "online",
  });
}

export function useAdmin(email: string) {
  return useQuery({
    queryKey: ["admins", email],
    queryFn: () => getAdmin(email),
    networkMode: "online",
  });
}
