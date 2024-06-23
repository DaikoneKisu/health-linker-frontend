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
} from "@ionic/react";
import { home, chatbox, folder, mail, person, add } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import React, { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1);
  const [currentCase, setCurrentCase] = useState<CasoClinico>();

  const casoEscogido = (caso: CasoClinico) => {
    setCurrentCase(caso);
  };

  const dentroCaso = (answer: boolean) => {
    setDentro(answer);
  };

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
      console.log(casosClinicos);
    }
  }, [cerrado]);

  return (
    <WithAuth>
      {dentro ? (
        <CasoIndividual casoClinico={currentCase!} dentroCaso={dentroCaso} />
      ) : (
        <IonPage>
          <IonHeader className="header-style">
            <IonTitle className="tittle-style">Health-Linker</IonTitle>
            <IonText className="subtittle-style">Casos Clínicos</IonText>

            <IonButtons class="botones-header">
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
        </IonPage>
      )}
    </WithAuth>
  );
};

export default CasosClinicos;
