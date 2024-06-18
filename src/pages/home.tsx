import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonFooter,
  IonText,
  IonIcon,
} from "@ionic/react";
import "./login.css";
import { arrowForwardCircle, pencil} from "ionicons/icons";
import { Route } from "react-router";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
          <IonTitle>HealthLinker</IonTitle>
      </IonHeader>

      <IonContent >
        <h3 className="h2-t">Inicia sesión para continuar</h3>
        <IonInput id="input-hl" label="Cédula"></IonInput>
        <IonInput id="input-hl" label="Contraseña" type="password"></IonInput>
      
        <IonButton>Acceder</IonButton>
        <div>
          <h6>¿No tienes cuenta?</h6>
          <IonButton size="small" routerLink="/registro">Registro</IonButton>
        </div>
        </IonContent>
    </IonPage>
  );
};

export default HomePage;
