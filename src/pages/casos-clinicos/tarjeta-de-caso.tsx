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
  dentroCaso: (answer: boolean) => void;
  casoEscogido: (caso: CasoClinico) => void;
}

const TarjetaDeCaso = ({ caso, dentroCaso, casoEscogido }: Props) => {
  return (
    <IonCard
      onClick={() => {
        dentroCaso(true);
        casoEscogido(caso);
      }}
    >
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
