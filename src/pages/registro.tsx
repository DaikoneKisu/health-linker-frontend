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
  IonButtons,
  IonFooter,
  IonText,
  IonIcon,
  IonInputPasswordToggle,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
} from "@ionic/react";
import "./login.css";
import { arrowForwardCircle, pencil } from "ionicons/icons";
import { Route } from "react-router";
import { useState } from "react";
import { registerSpecialist } from "../api/register";

const Registro: React.FC = () => {
  const [specialtyId, setSpecialtyId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // 2. Llamada a la función de registro
      const data = await registerSpecialist(
        specialtyId,
        document,
        email,
        fullName,
        password
      );

      // 3. Manejo de la respuesta
      if (data.success) {
        // Inicio de sesión exitoso
        console.log("¡Usuario registrado satisfactoriamente!");
        // Navega a otra página, etc.
      } else {
        throw new Error("No se ha podido registrar al especialista");
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error:", error);
      alert(error);
    }
  };

  console.log(fullName.toLowerCase());
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonTitle>HealthLinker</IonTitle>
      </IonHeader>

      <IonContent>
        <div>
          <h3 className="h2-t">Registro de especialista</h3>
        </div>

        <IonInput
          id="input-hl"
          label="Nombre Completo"
          value={fullName}
          onIonChange={(e) => setFullName(e.detail.value!)}
        ></IonInput>
        <IonInput
          id="input-hl"
          label="Cédula"
          value={document}
          onIonChange={(e) => setDocument(e.detail.value!)}
        ></IonInput>
        <IonInput
          id="input-hl"
          label="Correo"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>

        <div>
          <h6>Especialidad</h6>
          onSelect
          <IonPicker>
            <IonPickerColumn
              value={specialtyId}
              onIonChange={(e) => setSpecialtyId(Number(e.detail.value!))}
            >
              <IonPickerColumnOption value="" disabled={true}>
                --
              </IonPickerColumnOption>
              <IonPickerColumnOption value="1">
                Enfermero especialista
              </IonPickerColumnOption>
            </IonPickerColumn>
          </IonPicker>
        </div>
        <IonInput id="input-hl" label="Contraseña" type="password">
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
        <IonInput id="input-hl" label="Confirmar contraseña" type="password">
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>

        <IonButton>Registro</IonButton>
        <div>
          <h6>¿Ya tienes una cuenta?</h6>
          <IonButton size="small" routerLink="/home">
            Iniciar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registro;
