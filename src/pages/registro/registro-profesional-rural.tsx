import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
} from "@ionic/react";
import { registerRuralProfessional } from "../../api/register";
import { useState } from "react";

const RegistroProfesionalRural: React.FC = () => {
  const [zone, setZone] = useState("");
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (
        !fullName ||
        !password ||
        !document ||
        !email ||
        !passwordVerify ||
        !zone
      ) {
        throw new Error("Por favor, completa todos los campos.");
      } else if (password != passwordVerify) {
        throw new Error(
          "Las contraseñas proporcionadas no coinciden. Vuelva a intentar"
        );
      }
      // 2. Llamada a la función de registro
      const data = await registerRuralProfessional(
        zone,
        document,
        email,
        fullName,
        password
      );
      // 3. Manejo de la respuesta
      if (data.success) {
        // Registro exitoso
        alert("¡Usuario registrado satisfactoriamente!");
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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonTitle>HealthLinker</IonTitle>
      </IonHeader>

      <IonContent>
        <div>
          <h3 className="h2-t">Registro de profesional rural</h3>
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
        <IonInput
          id="input-hl"
          label="Zona"
          value={zone}
          onIonChange={(e) => setZone(e.detail.value!)}
        ></IonInput>
        <IonInput
          id="input-hl"
          label="Contraseña"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        >
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
        <IonInput
          id="input-hl"
          label="Confirmar contraseña"
          type="password"
          value={passwordVerify}
          onIonChange={(e) => setPasswordVerify(e.detail.value!)}
        >
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>

        <IonButton onClick={handleSubmit}>Registrar</IonButton>
        <div>
          <h6>¿Ya tienes una cuenta?</h6>
          <IonButton size="small" routerLink="/login">
            Iniciar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegistroProfesionalRural;
