import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Redirect } from "react-router-dom";
import { UserState, setUser, clearUser } from "../store/slices/user";
import { getOneUser } from "../api/auth";
import { useEffect, useState } from "react";
import { setAuth } from "../store/slices/auth";
interface Props {
  children: JSX.Element;
}

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

const WithAuth = ({ children }: Props): JSX.Element => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const getUser = async (user: any) => {
    const userData = await getOneUser(user!.document);
    console.log(userData);
    dispatch(setUser(userData.user!));
  };

  /*useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = parseJwt(token);
      getUser(userInfo);
      dispatch(setAuth(true));
    }
  }, []);
  */

  if (!auth.auth) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default WithAuth;
