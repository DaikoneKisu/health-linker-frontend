import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  useIonLoading,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { type CasoClinico } from "../types";
import LogoHeader from "../../../components/logo-header/logo-header";
import { getCase } from "../../../api/casos-clinicos";
import { useCommonToast } from "../../../hooks/useCommonToast";
import "./caso-clinico.css";
import CaseFileItem from "./case-file";
import { chatbubbleEllipsesOutline } from "ionicons/icons";

interface Props extends RouteComponentProps<{ id: string }> {}

const CasoClinico = ({ match }: Props) => {
  const [caso, setCaso] = useState<CasoClinico | null>(null);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  // For API response messages
  const [showToast] = useCommonToast();

  // For image preview
  const [previewUrl, setPreviewUrl] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(() => {
    // present({ spinner: "circles" });
    getCase(Number(match.params.id)).then((data) => {
      // dismiss();
      if (data.success) {
        setCaso(data.data!);
      } else {
        router.canGoBack() ? router.goBack() : router.push("/casos-clinicos");
        // alert("Error al cargar el caso clínico");
        showToast("Error al cargar el caso clínico", "error");
      }
    });
  });

  function downloadFile(fileName: string, url: string) {
    fetch(url, {
      method: "get",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
        dismiss();
      });
  }

  return (
    <IonPage>
      <LogoHeader />
      <IonContent>
        {!(caso == null) && (
          <>
            {/* Sobre el caso */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Datos del caso</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <IonLabel>
                    <strong>Descripción</strong>
                  </IonLabel>
                  <p>{caso.descripcionCaso}</p>
                </IonText>
                <br />
                <IonText>
                  <IonLabel>
                    <strong>Valoración del paciente</strong>
                  </IonLabel>
                  <p>{caso.valoracionPaciente}</p>
                </IonText>
                <br />
                <IonText>
                  <IonLabel>
                    <strong>Motivo por el que se pidió mentoría</strong>
                  </IonLabel>
                  <p>{caso.motivoMentoria}</p>
                </IonText>
                <br />
                <IonText>
                  <h3>
                    <strong className="sc-ion-label-md">
                      Especialidad requerida:
                    </strong>{" "}
                    {caso.especialidadRequerida}
                  </h3>
                </IonText>
              </IonCardContent>
            </IonCard>

            {/* Sobre el paciente */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Datos del paciente</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <h3>
                    <strong className="sc-ion-label-md">
                      Fecha de nacimiento:
                    </strong>{" "}
                    {caso.fechaNacimiento}
                  </h3>
                </IonText>
                <br />
                <IonText>
                  <h3>
                    <strong className="sc-ion-label-md">Género:</strong>{" "}
                    {caso.genero}
                  </h3>
                </IonText>
                <br />
                <IonText>
                  <IonLabel>
                    <strong>
                      Motivo por el que el paciente pidió consulta
                    </strong>
                  </IonLabel>
                  <p>{caso.motivoPaciente}</p>
                </IonText>
              </IonCardContent>
            </IonCard>

            {/* Archivos */}
            <IonCard style={{ paddingBottom: "10px" }}>
              <IonCardHeader>
                <IonCardTitle>Archivos asociados</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {(caso.archivosAsociados == null ||
                  caso.archivosAsociados.length === 0) && (
                  <p>Este caso no tiene archivos asociados</p>
                )}
                {caso.archivosAsociados != null &&
                  caso.archivosAsociados.length > 0 && (
                    <>
                      {/* Display list of files and allow preview */}
                      <IonList>
                        {caso.archivosAsociados.map((archivo, i) => (
                          <CaseFileItem
                            key={i}
                            fileExtension={archivo.enlace.split(".").pop()!}
                            fileName={archivo.enlace.split("/").pop()!}
                            onClickPreview={() => {
                              setPreviewUrl(archivo.enlace);
                              modal.current?.present();
                            }}
                          />
                        ))}
                      </IonList>

                      {/* Modal to display preview */}
                      <IonModal ref={modal}>
                        <IonContent className="ion-padding">
                          <h3 id="previewModalHeader">
                            Vista Previa de Archivo
                          </h3>
                          <IonImg
                            src={previewUrl}
                            alt="Vista previa del archivo"
                          />
                          <IonButton
                            id="previewModalClose"
                            onClick={() => {
                              setPreviewUrl("");
                              modal.current?.dismiss();
                            }}
                          >
                            Cerrar
                          </IonButton>
                        </IonContent>
                      </IonModal>

                      {/* Download button */}
                      <IonButton
                        onClick={() => {
                          present({ spinner: "circles" });
                          for (const archivo of caso.archivosAsociados!) {
                            downloadFile(
                              archivo.enlace.split("/").pop()!,
                              archivo.enlace
                            );
                          }
                          dismiss();
                        }}
                        color="primary"
                        style={{
                          margin: "0 auto",
                          display: "block",
                          width: "min(300px, 80%)",
                        }}
                      >
                        Descargar
                      </IonButton>
                    </>
                  )}
              </IonCardContent>
            </IonCard>
          </>
        )}
        <IonButton
          onClick={() => router.goBack()}
          color="tertiary"
          style={{
            margin: "50px auto",
            display: "block",
            width: "min(300px, 80%)",
          }}
        >
          Volver
        </IonButton>
      </IonContent>

      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton
          routerLink={`/casos-clinicos/caso-clinico/chat/${caso?.id}`}
        >
          <IonIcon icon={chatbubbleEllipsesOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default CasoClinico;
