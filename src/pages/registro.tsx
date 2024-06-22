import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
} from "@ionic/react";
import "./login.css";
import { useEffect, useState } from "react";
import { registerSpecialist, getSpecialities } from "../api/register";
import { Especialidad } from "./casos-clinicos/types";

const Registro: React.FC = () => {
  const [specialtyId, setSpecialtyId] = useState("1");
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [listaEspecialista, setListaEspecialista] = useState<Especialidad[]>(
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (
        !fullName ||
        !password ||
        !document ||
        !email ||
        !passwordVerify ||
        !specialtyId
      ) {
        throw new Error("Por favor, completa todos los campos.");
      } else if (password != passwordVerify) {
        throw new Error(
          "Las contraseñas proporcioandas no coinciden. Vuelva a intentar"
        );
      }
      // 2. Llamada a la función de registro
      const data = await registerSpecialist(
        Number(specialtyId),
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecialities();
      if (data.success) {
        setListaEspecialista(data.specialties);
      } else {
        console.error("Error:", data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonTitle>HealthLinker</IonTitle>
      </IonHeader>

      <IonContent>
        <IonButton size="large" routerLink="/registro/profesional-rural">
          Registrarse como profesional rural
        </IonButton>
        <IonButton size="large" routerLink="/registro/especialista">
          Registrarse como especialista
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

interface Props {
  listaEspecialista: Especialidad[];
}

export default Registro;
