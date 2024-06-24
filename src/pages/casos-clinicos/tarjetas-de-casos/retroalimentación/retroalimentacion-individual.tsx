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
  IonList,
} from "@ionic/react";
import { getCaseFeedback } from "../../../../api/feedback";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Feedback } from "../../types";
import "./styles.css";

interface Props {
  feedback: Feedback;
}

export const OneFeedback: React.FC<Props> = ({ feedback }) => {
  return (
    <div className="init-div-style">
      <IonText> {String(feedback.autor)}</IonText>
      <IonText> {String(feedback.fecha)}</IonText>
      <IonText> {String(feedback.texto)}</IonText>
    </div>
  );
};
