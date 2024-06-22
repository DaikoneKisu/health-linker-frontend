import "./tarjeta-de-caso.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { CasoClinico } from "./types";

interface Props {
  caso: CasoClinico;
}

const TarjetaDeCaso = ({ caso }: Props) => {
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
      <div className="ion-card-footer">
        <IonButton fill="outline">Editar</IonButton>
        <IonButton fill="outline">Eliminar</IonButton>
      </div>
    </IonCard>
  );
};

export default TarjetaDeCaso;
