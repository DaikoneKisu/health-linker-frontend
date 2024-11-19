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
import ConfirmCaseDelete from "../../../components/confirm-case-delete/confirm-case-delete";
import { useId } from "react";
import { closeClinicalCase } from "../../../api/casos-clinicos";

interface Props {
  caso: CasoClinico;
  getCases: () => void;
  isAdmin?: boolean;
}

const TarjetaDeCasoAbierto = ({ caso, getCases, isAdmin = false }: Props) => {
  const deleteButtonId = useId();

  const closeCase = async () => {
    closeClinicalCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
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
          {!isAdmin && (
            <IonButton
              fill="outline"
              routerLink={`/casos-clinicos/retroalimentaciones/caso-clinico/${caso.id}`}
              color="tertiary"
            >
              Retroalimentar
            </IonButton>
          )}
          {/* <IonButton fill="outline" color="tertiary">
            Editar
          </IonButton> */}
          <IonButton fill="outline" onClick={closeCase} color="tertiary">
            Cerrar
          </IonButton>
          <IonButton fill="outline" id={deleteButtonId} color="danger">
            Eliminar
          </IonButton>
          <ConfirmCaseDelete
            caseId={caso.id}
            afterDelete={() => getCases()}
            triggerElementId={deleteButtonId}
          />
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoAbierto;
