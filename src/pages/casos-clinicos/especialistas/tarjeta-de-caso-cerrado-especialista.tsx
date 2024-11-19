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
import { type CasoClinico } from "../types";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { getCaseDataForPdf } from "../tarjetas-de-casos/utils";
import { pdf } from "@react-pdf/renderer";
import PdfCaso from "../tarjetas-de-casos/pdf-caso";
import { saveAs } from "file-saver";

interface Props {
  caso: CasoClinico;
}

const TarjetaDeCasoCerradoEspecialista = ({ caso }: Props) => {
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

export default TarjetaDeCasoCerradoEspecialista;
