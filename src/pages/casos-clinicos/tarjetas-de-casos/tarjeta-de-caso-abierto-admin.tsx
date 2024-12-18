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
import { CasoClinicoAdmin } from "../types";

interface Props {
  caso: CasoClinicoAdmin;
  onAssign: () => void;
  onReassign: () => void;
}

const TarjetaDeCasoAbierto = ({ caso, onAssign, onReassign }: Props) => {
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
          {caso.assigned && (
            <IonButton
              fill="outline"
              routerLink={`/casos-clinicos/retroalimentaciones/caso-clinico/${caso.id}`}
              color="tertiary"
            >
              Retroalimentaciones
            </IonButton>
          )}
          {caso.assigned && (
            <IonButton fill="outline" color="tertiary" onClick={onReassign}>
              Cambiar especialista asignado
            </IonButton>
          )}
          {caso.assigned === false && (
            <IonButton fill="outline" color="tertiary" onClick={onAssign}>
              Asignar a especialista
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoAbierto;
