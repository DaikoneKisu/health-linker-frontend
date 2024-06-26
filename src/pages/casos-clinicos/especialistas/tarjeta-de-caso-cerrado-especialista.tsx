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
import {
  publicizeClinicalCase,
  reopenClinicalCase,
} from "../../../api/casos-clinicos";

interface Props {
  caso: CasoClinico;
  dentroCaso: (answer: boolean) => void;
  casoEscogido: (caso: CasoClinico) => void;
  getCases: () => void;
}

const TarjetaDeCasoCerradoEspecialista = ({
  caso,
  dentroCaso,
  casoEscogido,
  getCases,
}: Props) => {
  const publicizeCase = () => {
    publicizeClinicalCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
      } else {
        alert("Error al hacer público el caso");
      }
    });
  };

  const reopenCase = () => {
    reopenClinicalCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
      } else {
        alert("Error al reabrir el caso");
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
          {/* <IonButton
            fill="outline"
            routerLink={`/casos-clinicos/retroalimentaciones/cerrado/caso-clinico/${caso.id}`}
            color="tertiary"
          >
            Ver retroalimentaciones
          </IonButton> */}
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoCerradoEspecialista;
