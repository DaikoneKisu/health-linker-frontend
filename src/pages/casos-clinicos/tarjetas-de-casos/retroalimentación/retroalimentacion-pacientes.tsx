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
  IonInput,
} from "@ionic/react";
import { getCaseFeedback, submitFeedback } from "../../../../api/feedback";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Feedback } from "../../types";
import { FeedbackList } from "./lista-retroalimentaciones";
import "./styles.css";

interface Props {
  caseId: number;
  isFeedback: (answer: boolean) => void;
}

export const FeedbackRender: React.FC<Props> = ({ caseId, isFeedback }) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [refresher, setRefresher] = useState(false);
  const [texto, setTexto] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await submitFeedback(texto, caseId);
      if (data.success) {
        alert("Retroalimentación enviada exitosamente");
        refreshing();
      } else {
        throw new Error("Error al enviar la retroalimentación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

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
      <FeedbackList feedbacks={feedbackList} />
      <form onSubmit={handleSubmit}>
        <IonInput onIonChange={(e) => setTexto(e.detail.value!)}>
          chat:{" "}
        </IonInput>
        <IonButton type="submit">Acceder</IonButton>
      </form>
    </div>
  );
};
