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

export const ClosedFeedbackRender: React.FC<Props> = ({
  match,
  isFeedback,
}) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [refresher, setRefresher] = useState(false);
  const [texto, setTexto] = useState("");
  const router = useIonRouter();

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
