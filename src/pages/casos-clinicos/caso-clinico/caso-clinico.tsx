import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonLabel,
  IonPage,
  IonText,
  useIonLoading,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { type CasoClinico } from "../types";
import LogoHeader from "../../../components/logo-header/logo-header";
import { getCase } from "../../../api/casos-clinicos";
import { DateTime } from "luxon";

interface Props extends RouteComponentProps<{ id: string }> {}

const CasoClinico: React.FC<Props> = ({ match }) => {
  const [caso, setCaso] = useState<CasoClinico | null>(null);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  useIonViewWillEnter(() => {
    present({ spinner: "circles" });
    getCase(Number(match.params.id)).then((data) => {
      dismiss();
      if (data.success) {
        setCaso(data.data!);
      } else {
        router.canGoBack() ? router.goBack() : router.push("/casos-clinicos");
        alert("Error al cargar el caso clínico");
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
                    <strong>Especialidad requerida:</strong>{" "}
                    {caso.especialidadRequerida}
                  </h3>
                </IonText>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Datos del paciente</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <h3>
                    <strong>Fecha de nacimiento:</strong> {caso.fechaNacimiento}
                  </h3>
                </IonText>
                <br />
                <IonText>
                  <h3>
                    <strong>Género:</strong> {caso.genero}
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
    </IonPage>
  );
};

export default CasoClinico;
