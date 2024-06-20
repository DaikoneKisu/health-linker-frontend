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
import { signin } from "../api/auth";
import { useEffect, useState } from "react";
import WithUnAuth from "../components/WithUnAuth";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // 1. Validation (opcional, puedes hacerlo en el componente o en la función signin)
      if (!username || !password) {
        throw new Error("Por favor, completa ambos campos.");
      }

      // 2. Llamada a la función signin
      const data = await signin(username, password);

      // 3. Manejo de la respuesta
      if (data.success) {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso:", data.token);
        localStorage.setItem("token", data.token);
        // Navega a otra página, etc.
      } else {
        throw new Error("Credenciales inválidas.");
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error:", error);
      alert(error);
    }
  };

  /*useEffect(() => {
    const user = localStorage.getItem("token");
    console.log(user);
  }, []);
  */

  return (
    <WithUnAuth>
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonTitle>HealthLinker</IonTitle>
        </IonHeader>
        <IonContent fullscreen>
          <h3 className="h2-t">Inicia sesión para continuar</h3>
          <form onSubmit={handleSubmit}>
            <IonList>
              <IonItem>
                <IonInput
                  id="input-hl"
                  label="Cédula"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  id="input-hl"
                  label="Contraseña"
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
            </IonList>
            <IonButton type="submit">Acceder</IonButton>
          </form>
          <div>
            <h6>¿No tienes cuenta?</h6>
            <IonButton size="small" routerLink="/registro">
              Registro
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </WithUnAuth>
  );
};

export default HomePage;
