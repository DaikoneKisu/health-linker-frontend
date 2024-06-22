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
} from "@ionic/react";
import { home, chatbox, folder, mail, person, add } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import React, { useState, useEffect } from "react";
import { ListaCasos } from "./tarjetas-de-casos/tarjetas-clinicas";
import WithAuth from "../../components/WithAuth";
import { Redirect } from "react-router";
import { CasoIndividual } from "./tarjetas-de-casos/contenido-caso";
import {
  getCases,
  getClosedCasesCurrentUser,
  getOpenCasesCurrentUser,
} from "../../api/casos-clinicos";
import ListaDeCasos from "./lista-de-casos";

interface Props {
  children: JSX.Element;
}

const logOut = (): JSX.Element => {
  localStorage.removeItem("token");
  return <Redirect to="/login" />;
};

const CasosClinicos: React.FC = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);
  const [cerrado, setCerrado] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [caso, setCaso] = useState(0);
  const [page, setPage] = useState(1);

  const casoEscogido = (id: number) => {
    setCaso(id);
  };

  const dentroCaso = (answer: boolean) => {
    setDentro(answer);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCases();
      if (data.success) {
        console.log("Casos:", data.data);
      } else {
        console.error("Error:", data.error);
      }
    };

    fetchData();
  }, []);

  const getOpenCases = async () => {
    const response = await getOpenCasesCurrentUser(page);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
  };

  const getClosedCases = async () => {
    const response = await getClosedCasesCurrentUser(page);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
  };

  useEffect(() => {
    if (cerrado) {
      getClosedCases();
    } else {
      getOpenCases();
    }
  }, [cerrado]);

  useEffect(() => {
    console.log("El caso es: " + caso);
  }, [dentro, caso]);

  return (
    <WithAuth>
      <IonPage>
        <IonHeader>
          <IonTitle className="titulo-app">Casos clínicos</IonTitle>
          <IonButtons>
            <IonButton
              className="botones-casos"
              onClick={() => {
                setCerrado(true);
              }}
            >
              casos cerrados
            </IonButton>
            <IonButton
              className="botones-casos"
              onClick={() => {
                setCerrado(false);
              }}
            >
              Mis casos abiertos
            </IonButton>
            <IonButton
              className="botones-casos"
              onClick={() => {
                logOut();
              }}
            >
              Cerrar Sesion
            </IonButton>
          </IonButtons>
        </IonHeader>

        <IonContent>
          <ListaDeCasos
            casos={casosClinicos}
            dentroCaso={dentroCaso}
            casoEscogido={casoEscogido}
          />
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton color="light">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>

        <IonFooter>
          <IonButtons>
            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={home}></IonIcon>
            </IonButton>

            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={chatbox}></IonIcon>
            </IonButton>

            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={folder}></IonIcon>
            </IonButton>

            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={mail}></IonIcon>
            </IonButton>

            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={person}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonFooter>
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicos;
