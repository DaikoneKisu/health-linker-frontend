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
  useIonLoading,
} from "@ionic/react";
import { CasoClinico } from "../types";
import {
  publicizeClinicalCase,
  reopenClinicalCase,
} from "../../../api/casos-clinicos";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { getCaseDataForPdf } from "./utils";
import { pdf } from "@react-pdf/renderer";
import PdfCaso from "./pdf-caso";
import { saveAs } from "file-saver";

interface Props {
  caso: CasoClinico;
  getCases: () => void;
  isAdmin?: boolean;
}

const TarjetaDeCasoCerrado = ({ caso, getCases, isAdmin = false }: Props) => {
  const [showToast] = useCommonToast();
  const [present, dismiss] = useIonLoading();

  const downloadPdf = async () => {
    const fileData = await getCaseDataForPdf(caso.id);
    if (!fileData.success) {
      showToast(fileData.message, "error");
      dismiss();
      return;
    }
    const blob = await pdf(
      <PdfCaso
        medicalCase={fileData.medicalCase!}
        feedbackList={fileData.feedback!}
      />
    ).toBlob();
    const fileName = `documento-caso-nro-${caso.id}.pdf`;
    saveAs(blob, fileName);
    dismiss();
  };

  const publicizeCase = () => {
    publicizeClinicalCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
      } else {
        // alert("Error al hacer público el caso");
        showToast("Error al hacer público el caso", "error");
      }
    });
  };

  const reopenCase = () => {
    reopenClinicalCase(caso.id).then((data) => {
      if (data.success) {
        getCases();
      } else {
        alert("Error al reabrir el caso");
        showToast("Error al reabrir el caso", "error");
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
            routerLink={`/casos-clinicos/retroalimentaciones/cerrado/caso-clinico/${caso.id}`}
            color="tertiary"
          >
            Ver retroalimentaciones
          </IonButton>
          {!isAdmin && (
            <IonButton fill="outline" onClick={reopenCase} color="tertiary">
              Reabrir
            </IonButton>
          )}
          {!isAdmin && (
            <IonButton fill="outline" onClick={publicizeCase} color="tertiary">
              Hacer público
            </IonButton>
          )}
          <IonButton
            fill="outline"
            color="tertiary"
            onClick={() => {
              present({ spinner: "circles" });
              downloadPdf();
            }}
          >
            Descargar como PDF
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default TarjetaDeCasoCerrado;
