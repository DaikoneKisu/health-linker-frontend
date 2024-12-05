import {
  IonCard,
  IonButton,
  IonFooter,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonCardContent,
  useIonRouter,
} from "@ionic/react";
import { FeedbackList } from "./lista-retroalimentaciones";
import "./styles.css";
import { RouteComponentProps } from "react-router";
import LogoHeader from "../../../../components/logo-header/logo-header";
import otherStyles from "../../casos-clinicos.module.css";
import { useCaseFeedback } from "../../../../hooks/queries/feedback";

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const ClosedFeedbackRender = ({ match }: Props) => {
  const router = useIonRouter();
  const { id } = match.params;

  const { data: feedbacks } = useCaseFeedback(Number(id));

  return (
    <IonPage>
      <LogoHeader />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Retroalimentaciones</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <FeedbackList feedbacks={feedbacks?.data ?? []} />
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
