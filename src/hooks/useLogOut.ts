import { useIonRouter } from "@ionic/react";
import { useAppDispatch } from "../store/hooks";
import { setAuth } from "../store/slices/auth";
import { useQueryClient } from "@tanstack/react-query";

export function useLogOut() {
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries();
    dispatch(setAuth(false));
    router.push("/login");
  };
}
