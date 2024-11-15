import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonText,
  useIonViewWillEnter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonLoading,
  IonLoading,
  useIonRouter,
  useIonViewWillLeave,
  IonToolbar,
} from "@ionic/react";
import { home, chatbox, folder, mail, person, add } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import React, { useState, useEffect, useRef } from "react";
import WithAuth from "../../components/WithAuth";
import { Redirect } from "react-router";
import { CasoIndividual } from "./tarjetas-de-casos/contenido-caso";
import {
  getCases,
  getClosedCasesCurrentUser,
  getOpenCasesCurrentUser,
  getRequiredCurrentSpecialistCases,
} from "../../api/casos-clinicos";
import ListaDeCasos from "./lista-de-casos";
import LogoHeader from "../../components/logo-header/logo-header";
import styles from "./casos-clinicos.module.css";
import { getMe } from "../../api/auth";
import ListaDeCasosEspecialistas from "./lista-de-casos-especialistas";
import { useAppDispatch } from "../../store/hooks";
import { setAuth } from "../../store/slices/auth";

interface Props {
  children: JSX.Element;
}

const CasosClinicos = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);
  const [cerrado, setCerrado] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [page, setPage] = useState(1);
  const [currentCase, setCurrentCase] = useState<CasoClinico>();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mentorear, setMentorear] = useState(false);

  const dispatch = useAppDispatch();
  const router = useIonRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    router.push("/login");
  };

  const casoEscogido = (caso: CasoClinico) => {
    setCurrentCase(caso);
  };

  const dentroCaso = (answer: boolean) => {
    setDentro(answer);
  };

  const getOpenCases = async () => {
    startLoading();
    const response = await getOpenCasesCurrentUser(page);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const getClosedCases = async () => {
    startLoading();
    const response = await getClosedCasesCurrentUser(page);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const getRequiredCurrentSpecialist = async () => {
    startLoading();
    const response = await getRequiredCurrentSpecialistCases();
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "rural professional") {
      if (cerrado && !(localStorage.getItem("token") == null)) {
        getClosedCases().then(() => setPageLoaded(true));
      } else {
        getOpenCases().then(() => setPageLoaded(true));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "specialist") {
      if (!mentorear && cerrado && !(localStorage.getItem("token") == null)) {
        getClosedCases().then(() => setPageLoaded(true));
      } else if (
        !mentorear &&
        !cerrado &&
        !(localStorage.getItem("token") == null)
      ) {
        getOpenCases().then(() => setPageLoaded(true));
      } else if (
        mentorear &&
        !cerrado &&
        !(localStorage.getItem("token") == null)
      ) {
        getRequiredCurrentSpecialist().then(() => setPageLoaded(true));
      }
    }
  }, [user]);

  useIonViewWillEnter(() => {
    getMe().then((data) => {
      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Error:", data.error);
      }
    });
  });

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "rural professional") {
      if (pageLoaded && !(localStorage.getItem("token") == null)) {
        if (cerrado) {
          getClosedCases();
        } else {
          getOpenCases();
        }
      }
    }
  }, [cerrado]);

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "specialist") {
      if (pageLoaded && !(localStorage.getItem("token") == null)) {
        if (!mentorear && cerrado && !(localStorage.getItem("token") == null)) {
          getClosedCases();
        } else if (
          !mentorear &&
          !cerrado &&
          !(localStorage.getItem("token") == null)
        ) {
          getOpenCases();
        } else if (
          mentorear &&
          !cerrado &&
          !(localStorage.getItem("token") == null)
        ) {
          getRequiredCurrentSpecialist();
        }
      }
    }
  }, [cerrado, mentorear]);

  useIonViewWillLeave(() => {
    setPageLoaded(false);
  });

  return (
    <WithAuth>
      <IonPage>
        {user && user.userType === "rural professional" && (
          <>
            <LogoHeader>
              <IonHeader className="header-style ion-no-border">
                <IonTitle className={`${styles.header}`}>
                  Casos Clínicos
                </IonTitle>
                <IonToolbar>
                  <IonButtons class={`${styles.buttons}`}>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        setCerrado(true);
                      }}
                      color="primary"
                      fill={cerrado ? "solid" : "outline"}
                    >
                      Mis casos cerrados
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        setCerrado(false);
                      }}
                      color="primary"
                      fill={!cerrado ? "solid" : "outline"}
                    >
                      Mis casos abiertos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={isLoading} />
              <ListaDeCasos
                casos={isLoading ? [] : casosClinicos}
                dentroCaso={dentroCaso}
                casoEscogido={casoEscogido}
                cerrado={cerrado}
                getCases={cerrado ? getClosedCases : getOpenCases}
              />
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton
                  color="primary"
                  routerLink="/casos-clinicos/crear"
                >
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonContent>
          </>
        )}
        {user && user.userType === "specialist" && (
          <>
            <LogoHeader>
              <IonHeader className="header-style ion-no-border">
                <IonTitle className={`${styles.header}`}>
                  Casos Clínicos
                </IonTitle>
                <IonToolbar>
                  <IonButtons class={`${styles.buttons}`}>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        setCerrado(true);
                        setMentorear(false);
                      }}
                      color="primary"
                      fill={!mentorear && cerrado ? "solid" : "outline"}
                    >
                      Casos cerrados
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        setCerrado(false);
                        setMentorear(false);
                      }}
                      color="primary"
                      fill={!mentorear && !cerrado ? "solid" : "outline"}
                    >
                      Casos abiertos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        setCerrado(false);
                        setMentorear(true);
                      }}
                      color="primary"
                      fill={mentorear && !cerrado ? "solid" : "outline"}
                    >
                      Casos mentoreables
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={isLoading} />
              <ListaDeCasosEspecialistas
                casos={isLoading ? [] : casosClinicos}
                dentroCaso={dentroCaso}
                casoEscogido={casoEscogido}
                cerrado={cerrado}
                getCases={
                  !mentorear && cerrado
                    ? getClosedCases
                    : !mentorear && !cerrado
                    ? getOpenCases
                    : mentorear && !cerrado
                    ? getRequiredCurrentSpecialist
                    : () => {}
                }
                mentorear={mentorear}
              />
            </IonContent>
          </>
        )}
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicos;
