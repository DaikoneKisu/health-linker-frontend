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

export default function TarjetaRecurso({
  recurso,
}: {
  recurso: EducationalResource;
}) {
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
            Ver recurso
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
}
