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
import { getCaseFeedback } from "../../../../api/feedback";
import { person } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { Feedback } from "../../types";
import "./styles.css";

interface Props {
  caseId: number;
  isFeedback: (answer: boolean) => void;
}

export const FeedbackRender: React.FC<Props> = ({ caseId, isFeedback }) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [refresher, setRefresher] = useState(false);

  const gettingFeedbacks = async () => {
    const response = await getCaseFeedback(caseId);
    if (response.success) {
      setFeedbackList(response.data!);
    } else {
      console.error("Error:", response.error);
    }
  };

  const refreshing = () => {
    setRefresher(!refresher);
  };

  useEffect(() => {
    gettingFeedbacks();

    console.log(feedbackList);
  }, [refresher]);

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
      <IonButton
        onClick={() => {
          refreshing();
        }}
      >
        Refrescar
      </IonButton>
    </div>
  );
};
