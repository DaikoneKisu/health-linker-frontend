import {
  IonHeader,
  IonTitle,
  IonCard,
  IonButton,
  IonText,
  IonFooter,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
} from "@ionic/react";
import { CasoClinico } from "../../types";
import { person } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./styles.css";

interface Props {
  caseId: number;
  isFeedback: (answer: boolean) => void;
}

export const Feedback: React.FC<Props> = ({ caseId, isFeedback }) => {
  return (
    <div className="init-div-style">
      <IonText> bienvenido a la retroalimentación :' D</IonText>
      <IonButton
        onClick={() => {
          isFeedback(false);
        }}
      >
        Volver al contenido
      </IonButton>
    </div>
  );
};
