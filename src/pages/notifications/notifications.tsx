import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import LogoHeader from "../../components/logo-header/logo-header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearNotifications } from "../../store/slices/notifications";

export default function NotificationsPage() {
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <IonPage>
      <LogoHeader />
      <IonContent className="ion-padding">
        <IonList>
          {!!notifications.assignedCasesCount && (
            <IonItem>
              <IonLabel>
                Tienes {notifications.assignedCasesCount}{" "}
                {notifications.assignedCasesCount === 1
                  ? "caso clínico asignado"
                  : "casos clínicos asignados"}
              </IonLabel>
            </IonItem>
          )}

          {!!notifications.feedbackCount && (
            <IonItem>
              <IonLabel>
                Tienes {notifications.feedbackCount}{" "}
                {notifications.feedbackCount === 1
                  ? "nueva retroalimentación"
                  : "nuevas retroalimentaciones"}{" "}
                en tus casos clínicos
              </IonLabel>
            </IonItem>
          )}

          {!!notifications.messagesCount && (
            <IonItem>
              <IonLabel>
                Tienes {notifications.messagesCount}{" "}
                {notifications.messagesCount === 1
                  ? "mensaje de chat nuevo"
                  : "mensajes de chat nuevos"}
              </IonLabel>
            </IonItem>
          )}

          {!!notifications.newCasesCount && (
            <IonItem>
              <IonLabel>
                Se {notifications.newCasesCount === 1 ? "ha" : "han"} creado{" "}
                {notifications.newCasesCount}{" "}
                {notifications.newCasesCount === 1
                  ? "caso nuevo"
                  : "casos nuevos"}
              </IonLabel>
            </IonItem>
          )}

          {!notifications.feedbackCount &&
            !notifications.assignedCasesCount &&
            !notifications.messagesCount &&
            !notifications.newCasesCount && (
              <IonText>No tienes notificaciones por el momento.</IonText>
            )}
        </IonList>
        {(notifications.feedbackCount ||
          notifications.assignedCasesCount ||
          notifications.messagesCount ||
          notifications.newCasesCount) && (
          <div style={{ textAlign: "center" }}>
            <IonButton
              fill="solid"
              color="primary"
              onClick={() => {
                dispatch(clearNotifications());
              }}
            >
              Eliminar notificaciones
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
