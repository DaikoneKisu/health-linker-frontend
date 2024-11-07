import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
} from "@ionic/react";
import styles from "./registro.module.css";
import { FormikProps, FormikValues } from "formik";

/**
 * Modal to display consent information to registering user.
 *
 * Inits form submission.
 */
const ConsentModal = ({
  formRef,
  dismiss,
}: {
  formRef: React.RefObject<FormikProps<FormikValues> | null>;
  dismiss: (data?: string, role?: string) => void;
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle className={styles.modalTitle}>Consentimiento Informado</IonTitle>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          <em>
            Telementoría de soporte especializado para personal de enfermería en
            áreas rurales
          </em>{" "}
          invita a profesionales de salud a participar en un estudio conducido
          por PUCE. El objetivo es evaluar la herramienta digital{" "}
          <em>HealthLinker</em>, diseñada para mejorar la atención en zonas
          rurales a través de telementoría.
        </p>
        <p>
          Los participantes utilizarán la herramienta durante sus actividades
          profesionales y participarán en encuestas y entrevistas para
          identificar mejoras y resolver fallos. El estudio tiene una duración
          aproximada hasta completar el diagnóstico del paciente.
        </p>
        <p>
          La participación es voluntaria y los riesgos son mínimos, limitados a
          posibles inconvenientes tecnológicos. Los beneficios incluyen la
          posibilidad de contribuir a mejorar la atención médica en zonas rurales.
        </p>
        <p>
          Toda la información proporcionada será confidencial y codificada, y
          los participantes podrán retirarse en cualquier momento sin
          repercusiones laborales. Al firmar, el participante da su
          consentimiento para formar parte del estudio.
        </p>
        <p>¿Autoriza el uso de la información?</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <IonButton
            onClick={() => {
              if (formRef.current) {
                formRef.current.handleSubmit();
              }
              dismiss(undefined, "accepted");
            }}
          >
            Aceptar
          </IonButton>
          <IonButton
            color="light"
            onClick={() => {
              dismiss(undefined, "cancel");
            }}
          >
            Rechazar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConsentModal;
