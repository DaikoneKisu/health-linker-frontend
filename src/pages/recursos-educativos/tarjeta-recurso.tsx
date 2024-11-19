import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { EducationalResource } from "../casos-clinicos/types";
import { useAppSelector } from "../../store/hooks";

export default function TarjetaRecurso({
  recurso,
  onClickDelete,
}: {
  recurso: EducationalResource;
  onClickDelete: () => void;
}) {
  const user = useAppSelector((state) => state.user);

  const isAuthor =
    user.document === recurso.authorDocument ||
    user.email === recurso.authorEmail;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{recurso.title}</IonCardTitle>
        <IonCardSubtitle>
          {new Date(recurso.createdAt).toLocaleDateString()}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonText>De: {recurso.adminName ?? recurso.specialistName}</IonText>
      </IonCardContent>

      <IonToolbar className="ion-card-footer">
        <IonButtons style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <IonButton
            fill="solid"
            routerLink={`/recursos/${recurso.id}`}
            color="primary"
          >
            Leer
          </IonButton>
          {isAuthor && (
            <IonButton
              fill="outline"
              color="tertiary"
              routerLink={`/recursos/editar/${recurso.id}`}
            >
              Editar
            </IonButton>
          )}
          {isAuthor && (
            <IonButton fill="outline" color="danger" onClick={onClickDelete}>
              Eliminar
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
}
