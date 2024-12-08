import "./tarjeta-de-caso.css";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonToolbar,
} from "@ionic/react";
import { CasoClinico } from "../types";
import { useId } from "react";
import { closeClinicalCase } from "../../../api/casos-clinicos";

interface Props {
  caso: CasoClinico;
  getCases: () => void;
}

const TarjetaDeCasoAbiertoEspecialista = ({ caso, getCases }: Props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          Especialidad requerida: <strong>{caso.especialidadRequerida}</strong>
        </IonCardTitle>
        <IonCardSubtitle>
          Género del paciente: <span>{caso.genero}</span>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{caso.descripcionCaso}</p>
      </IonCardContent>
      <IonToolbar className="ion-card-footer">
        <IonButtons style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <IonButton
            fill="outline"
            routerLink={`/casos-clinicos/caso-clinico/${caso.id}`}
            color="tertiary"
          >
            Ver
          </IonButton>
          <IonButton
            fill="outline"
            routerLink={`/casos-clinicos/retroalimentaciones/caso-clinico/${caso.id}`}
            color="tertiary"
          >
            Retroalimentar
          </IonButton>
          <IonButton
            fill="outline"
            routerLink={`/casos-clinicos/caso-clinico/chat/${caso.id}`}
            color="tertiary"
          >
            Chat
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoAbiertoEspecialista;
