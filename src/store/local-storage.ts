import { useLocalStorage } from "usehooks-ts";
import { UserState } from "./slices/user";
import { Role } from "./slices/role";
import { AuthState, setAuth } from "./slices/auth";
import { useAppDispatch } from "./hooks";
import { useIonRouter } from "@ionic/react";
import { useQueryClient } from "@tanstack/react-query";

export const useStoreLogin = () => {
  const [user, setUser, removeUser] = useLocalStorage<UserState | null>(
    "user",
    null
  );
  const [role, setRole, removeRole] = useLocalStorage<Role>("role", "");
  const [auth, setAuth, removeAuth] = useLocalStorage<AuthState>("auth", {
    auth: false,
  });

  return (token: string, user: UserState, role: Role, auth: AuthState) => {
    localStorage.setItem("token", token);
    setUser(user);
    setRole(role);
    setAuth(auth);
  };
};

export const useSetAuthLocalStorage = () => {
  const [auth, setAuth, removeAuth] = useLocalStorage<AuthState>("auth", {
    auth: false,
  });

  return (authVal: boolean) => setAuth({ auth: authVal });
};

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const queryClient = useQueryClient();

  const [user, setUser, removeUser] = useLocalStorage<UserState | null>(
    "user",
    null
  );
  const [role, setRole, removeRole] = useLocalStorage<Role>("role", "");
  const [auth, setAuthLocal, removeAuth] = useLocalStorage<AuthState>("auth", {
    auth: false,
  });

  return () => {
    localStorage.removeItem("token");
    setAuthLocal({ auth: false });
    removeRole();
    removeUser();

    queryClient.invalidateQueries();

    dispatch(setAuth(false));

    router.push("/login");
  };
};
