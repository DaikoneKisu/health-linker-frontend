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
import React, { useState, useEffect } from "react";
import { Feedback } from "../../types";
import { OneFeedback } from "./retroalimentacion-individual";
import "./styles.css";

interface Props {
  feedbacks: Feedback[];
}

export const FeedbackList: React.FC<Props> = ({ feedbacks }) => {
  return (
    <IonList>
      {feedbacks.map((c) => (
        <OneFeedback feedback={c} key={c.id} />
      ))}
    </IonList>
  );
};
