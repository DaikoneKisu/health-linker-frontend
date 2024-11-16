import { useIonRouter } from "@ionic/react";
import { useAppDispatch } from "../store/hooks";
import { setAuth } from "../store/slices/auth";

export function useLogOut() {
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  return () => {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    router.push("/login");
  };
}
