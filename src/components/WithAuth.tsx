import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Redirect } from "react-router-dom";
import { setUser } from "../store/slices/user";
import { getOneUser } from "../api/auth";
import { PropsWithChildren } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { setAuth } from "../store/slices/auth";

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al parsear el token JWT:", error);
    return null; // O lanzar una excepción, según tu lógica de manejo de errores
  }
};

const WithAuth = ({ children }: PropsWithChildren) => {
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const getUser = async (user: any) => {
    if (user && user.document) {
      const userData = await getOneUser(user!.document);
      dispatch(setUser({ ...userData.user!, role: "regular" }));
    } else {
      dispatch(setUser({ ...user, role: "admin" }));
    }
  };

  useIonViewWillEnter(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = parseJwt(token);
      getUser(userInfo);
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, []);

  if (!auth.auth) {
    return <Redirect to="/login" />;
  } else {
    return children;
  }
};

export default WithAuth;
