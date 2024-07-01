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
  IonContent,
  IonPage,
  IonCardContent,
  useIonRouter,
  useIonViewDidLeave,
} from "@ionic/react";
import { getCaseFeedback, submitFeedback } from "../../../../api/feedback";
import React, { useState, useEffect } from "react";
import { Feedback } from "../../types";
import { FeedbackList } from "./lista-retroalimentaciones";
import "./styles.css";
import { RouteComponentProps } from "react-router";
import LogoHeader from "../../../../components/logo-header/logo-header";
import otherStyles from "../../casos-clinicos.module.css";

interface Props extends RouteComponentProps<{ id: string }> {
  isFeedback: (answer: boolean) => void;
}

export const FeedbackRender: React.FC<Props> = ({ match, isFeedback }) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [refresher, setRefresher] = useState(false);
  const [texto, setTexto] = useState("");
  const router = useIonRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await submitFeedback(texto, Number(match.params.id));
      if (data.success) {
        alert("Retroalimentación enviada exitosamente");
        setTexto("");
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
    const response = await getCaseFeedback(Number(match.params.id));
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

  useIonViewDidLeave(() => {
    setTexto("");
  });

  return (
    <IonPage>
      <LogoHeader />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Retroalimentaciones</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <FeedbackList feedbacks={feedbackList} />
          </IonCardContent>
        </IonCard>
        <div className="init-div-style"></div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonInput
                onIonInput={(e) => setTexto(e.detail.value!)}
                style={{ marginBottom: "10px" }}
                required
                helperText="Ingresa tu retroalimentacion aquí"
              >
                Retroalimentación:
              </IonInput>
              <IonButton type="submit">Enviar</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
        <IonButton
          className={`${otherStyles.button}`}
          style={{ margin: "0 auto", display: "block", marginBottom: "10px" }}
          onClick={() => {
            router.push("/casos-clinicos");
          }}
        >
          Volver a casos clínicos
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
