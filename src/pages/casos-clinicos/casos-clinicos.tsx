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
import "./styles.css";

const CasosClinicos: React.FC = () => {
  return (
    <IonPage style={{ backgroundColor: "blue" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <h1 style={{ color: "green" }}>Casos Clínicos</h1>
      </div>
    </IonPage>
  );
};

export default CasosClinicos;
