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
} from "../../api/casos-clinicos";
import ListaDeCasos from "./lista-de-casos";
import LogoHeader from "../../components/logo-header/logo-header";
import styles from "./casos-clinicos.module.css";

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

  const logOut = () => {
    localStorage.removeItem("token");
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

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  useIonViewWillEnter(() => {
    if (cerrado && !(localStorage.getItem("token") == null)) {
      getClosedCases().then(() => setPageLoaded(true));
    } else {
      getOpenCases().then(() => setPageLoaded(true));
    }
  });

  useEffect(() => {
    if (pageLoaded && !(localStorage.getItem("token") == null)) {
      if (cerrado) {
        getClosedCases();
      } else {
        getOpenCases();
      }
    }
  }, [cerrado]);

  useIonViewWillLeave(() => {
    setPageLoaded(false);
  });

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${styles.header}`}>Casos Clínicos</IonTitle>
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
          />
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton color="primary" routerLink="/casos-clinicos/crear">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicos;
