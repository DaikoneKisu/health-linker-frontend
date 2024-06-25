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
  useIonRouter,
} from "@ionic/react";
import { CasoClinico } from "../types";
import ConfirmCaseDelete from "../../../components/confirm-case-delete/confirm-case-delete";
import { useId } from "react";
import { closeClinicalCase } from "../../../api/casos-clinicos";

interface Props {
  caso: CasoClinico;
  dentroCaso: (answer: boolean) => void;
  casoEscogido: (caso: CasoClinico) => void;
}

const TarjetaDeCasoAbierto = ({ caso, dentroCaso, casoEscogido }: Props) => {
  const deleteButtonId = useId();
  const router = useIonRouter();

  const closeCase = async () => {
    closeClinicalCase(caso.id).then((data) => {
      if (data.success) {
        alert("Caso cerrado con éxito");
        router.push("/casos-clinicos");
      } else {
        alert("Error al cerrar el caso");
      }
    });
  };

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
          <IonButton fill="outline" color="tertiary">
            Editar
          </IonButton>
          <IonButton fill="outline" onClick={closeCase} color="tertiary">
            Cerrar
          </IonButton>
          <IonButton fill="outline" id={deleteButtonId} color="danger">
            Eliminar
          </IonButton>
          <ConfirmCaseDelete
            caseId={caso.id}
            afterDelete={() => router.push("/casos-clinicos")}
            triggerElementId={deleteButtonId}
          />
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoAbierto;
