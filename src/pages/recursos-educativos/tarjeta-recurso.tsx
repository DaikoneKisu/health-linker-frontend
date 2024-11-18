import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
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
    </IonCard>
  );
}
