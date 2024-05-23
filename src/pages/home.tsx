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
} from "@ionic/react";
import "./login.css";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">¡Bienvenido a HealthLinker!</IonTitle>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput label="Usuario"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput label="Contraseña" type="password"></IonInput>
          </IonItem>
        </IonList>
        <IonButton>Acceder</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
