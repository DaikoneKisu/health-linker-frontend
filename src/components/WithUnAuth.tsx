import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { UserState, clearUser, setUser } from "../store/slices/user";
import { getOneUser } from "../api/auth";
import { parseJwt } from "./WithAuth";
import { Redirect } from "react-router";
import { setAuth } from "../store/slices/auth";

interface Props {
  children: JSX.Element;
}

const WithUnAuth = ({ children }: Props) => {
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const getUser = async (user: any) => {
    const userData = await getOneUser(user!.document);
    dispatch(setUser(userData.user!));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = parseJwt(token);
      getUser(userInfo);
      dispatch(setAuth(true));
    }
  }, []);

  if (auth.auth) {
    return <Redirect to="/CasosClinicos" />;
  } else {
    return children;
  }
};

export default WithUnAuth;
