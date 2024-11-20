import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import styles from "./FaqModal.module.css";
import { useState } from "react";

const FAQ = [
  {
    question:
      "¿Cómo puedo manejar las solicitudes de registro y autenticación de usuarios?",
    reply:
      "Los usuarios se registran por medio de la página web, con su documento de identidad y una contraseña que ellos mismos gestionan. Los administradores siempre tienen acceso al listado de usuarios registrados",
  },
  {
    question: "¿Qué hacer si un usuario olvida su contraseña?",
    reply:
      "Por el momento, los usuarios deben contactar a los administradores para recuperar su contraseña. Si eres administrador, ingresa al panel, busca al usuario e ingresa a su perfil para cambiar su contraseña",
  },
  {
    question:
      "¿Cómo gestionar permisos y roles de los usuarios (administradores)?",
    reply:
      "Los usuarios escogen su rol al registrarse, y la plataforma asigna permisos en base a esto. Las cuentas de administrador solo pueden ser creadas por otro administrador, desde su panel",
  },
  {
    question: "¿Cómo puedo realizar copias de seguridad de los datos?",
    reply: "TODO",
  },
  {
    question: "¿Qué hacer si hay un fallo técnico en la página?",
    reply:
      "Intenta revisar tu conexión a internet, recargar la página o volver a ingresar. Si el problema persiste, contacta a los administradores o al equipo de desarrollo",
  },
];

export function FaqModal({
  dismiss,
}: {
  dismiss: (data?: string | null | undefined | number, role?: string) => void;
}) {
  const [selectedQuestion, setSelectedQuestion] = useState<
    (typeof FAQ)[number] | null
  >(null);

  return (
    <IonPage>
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonTitle>Preguntas frecuentes</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className={`${styles.faqToolbarBtn}`}
              onClick={() => dismiss()}
            >
              Cerrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!selectedQuestion && (
          <IonList className="ion-padding">
            {FAQ.map((faq, i) => (
              <IonItem key={i} onClick={() => setSelectedQuestion(faq)}>
                <IonLabel>{faq.question}</IonLabel>
                <IonIcon slot="end" icon={chevronForward} />
              </IonItem>
            ))}
          </IonList>
        )}

        {selectedQuestion && (
          <div className={`ion-padding ${styles.faqContainer}`}>
            <h3>{selectedQuestion.question}</h3>
            <IonText>{selectedQuestion.reply}</IonText>
            <IonButton onClick={() => setSelectedQuestion(null)}>
              Entendido
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
