import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
} from "@ionic/react";
import "./login.css";
import "./not-found.module.css";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle>HealthLinker</IonTitle>
      </IonHeader>
      <IonContent>
        <h2>404 - Página no encontrada</h2>
        <IonButton routerLink="/" size="small">
          Volver a home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
