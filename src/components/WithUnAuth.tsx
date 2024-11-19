import { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/slices/user";
import { getOneUser } from "../api/auth";
import { parseJwt } from "./WithAuth";
import { Redirect } from "react-router";
import { setAuth } from "../store/slices/auth";
import { useIonViewWillEnter } from "@ionic/react";
import { setRole } from "../store/slices/role";

const WithUnAuth = ({ children }: PropsWithChildren) => {
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const getUser = async (user: any) => {
    if (user && user.document) {
      const userData = await getOneUser(user!.document);
      dispatch(setUser({ ...userData.user!, type: userData.user.userType }));
      dispatch(setRole("regular"));
    } else {
      dispatch(setUser(user));
      dispatch(setRole("admin"));
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

  if (auth.auth) {
    return <Redirect to="/casos-clinicos" />;
  } else {
    return children;
  }
};

export default WithUnAuth;
