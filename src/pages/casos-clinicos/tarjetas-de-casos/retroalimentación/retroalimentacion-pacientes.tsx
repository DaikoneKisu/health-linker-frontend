import {
  IonCard,
  IonButton,
  IonFooter,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonContent,
  IonPage,
  IonCardContent,
  useIonRouter,
  useIonViewDidLeave,
} from "@ionic/react";
import { submitFeedback } from "../../../../api/feedback";
import React, { useState } from "react";
import { FeedbackList } from "./lista-retroalimentaciones";
import "./styles.css";
import { RouteComponentProps } from "react-router";
import LogoHeader from "../../../../components/logo-header/logo-header";
import otherStyles from "../../casos-clinicos.module.css";
import { useCommonToast } from "../../../../hooks/useCommonToast";
import { useCaseFeedback } from "../../../../hooks/queries/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const FeedbackRender = ({ match }: Props) => {
  const [texto, setTexto] = useState("");
  const router = useIonRouter();
  const { id: caseId } = match.params;

  // For API responses
  const [showToast] = useCommonToast();

  const queryClient = useQueryClient();

  const { data: feedbacks } = useCaseFeedback(Number(caseId));

  const submitMutation = useMutation({
    mutationFn: () => submitFeedback(texto, Number(caseId)),
    onSuccess: ({ success }) => {
      if (success) {
        showToast("Retroalimentación enviada exitosamente", "success");
        setTexto("");
        queryClient.invalidateQueries({
          queryKey: ["feedback", { caseId: Number(caseId) }],
        });
      } else {
        showToast("Error al enviar la retroalimentación", "error");
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    submitMutation.mutate();
  };

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
            <FeedbackList feedbacks={feedbacks?.data ?? []} />
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
                value={texto}
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
