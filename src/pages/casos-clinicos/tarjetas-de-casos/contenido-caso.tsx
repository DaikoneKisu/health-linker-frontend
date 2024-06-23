import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonButtons,
  IonButton,
  IonText,
  IonList,
  IonFooter,
  IonIcon,
  IonCardContent,
  IonItemDivider,
  IonItemSliding,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
} from "@ionic/react";
import { CasoClinico } from "../types";
import { DatosPaciente } from "./información/datos-paciente";
import { Feedback } from "./retroalimentación/retroalimentacion-pacientes";
import { person } from "ionicons/icons";
import React, { useState, useEffect } from "react";

interface Props {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}

export const CasoIndividual: React.FC<Props> = ({
  casoClinico,
  dentroCaso,
}) => {
  const [feedback, setFeedback] = useState(false);

  const isFeedback = (answer: boolean) => {
    setFeedback(answer);
  };

  return (
    <div>
      {feedback ? (
        <Feedback caseId={casoClinico.id} isFeedback={isFeedback} />
      ) : (
        <DatosPaciente
          casoClinico={casoClinico}
          dentroCaso={dentroCaso}
          isFeedback={isFeedback}
        />
      )}
    </div>
  );
};
