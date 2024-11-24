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
import { mentorCase } from "../../../api/casos-clinicos";

interface Props {
  caso: CasoClinico;
  getCases: () => void;
}

const TarjetaDeCasoMentoreableEspecialista = ({ caso, getCases }: Props) => {
  const mentorClinicalCase = () => {
    mentorCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
      } else {
        alert("Error al mentorear el caso");
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
          <IonButton
            fill="outline"
            onClick={mentorClinicalCase}
            color="tertiary"
          >
            Mentorear
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoMentoreableEspecialista;
