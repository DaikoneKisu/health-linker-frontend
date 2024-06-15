import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonButtons,
  IonButton,
  IonText,
  IonList,
  IonSearchbar,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import { home, chatbox, folder, mail, person, map } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import React, { useState, useEffect } from "react";
import { ListaCasos } from "./tarjetas-de-casos/tarjetas-clinicas";

const CasosClinicos: React.FC = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);
  const [cerrado, setCerrado] = useState(false);
  useEffect(() => {
    const pacientes: CasoClinico[] = [
      {
        id: 1,
        nombre: "Eduardo Arzolay",
        fNacimiento: "1990-05-15",
        genero: "Masculino",
        especialidad: "Cardiología",
        valoracionPaciente: "Excelente",
        descripcionCaso: "Historial de hipertensión",
        archivoAsociado: "informe.pdf",
        MotivoMentoria: "Aprender más sobre ecocardiografía",
        estatus: false,
      },
      {
        id: 2,
        nombre: "Luis Hernandez",
        fNacimiento: "1985-08-20",
        genero: "Masculino",
        especialidad: "Dermatología",
        valoracionPaciente: "Bueno",
        descripcionCaso: "Dermatitis crónica",
        archivoAsociado: "fotos_piel.zip",
        MotivoMentoria: "Discutir opciones de tratamiento",
        estatus: true,
      },
      {
        id: 3,
        nombre: "Daniel Amado",
        fNacimiento: "1990-05-15",
        genero: "Femenino",
        especialidad: "Cardiología",
        valoracionPaciente: "Excelente",
        descripcionCaso: "Historial de hipertensión",
        archivoAsociado: "informe.pdf",
        MotivoMentoria: "Aprender más sobre ecocardiografía",
        estatus: false,
      },
      {
        id: 4,
        nombre: "Santiago Berrios",
        fNacimiento: "1985-08-20",
        genero: "Masculino",
        especialidad: "Dermatología",
        valoracionPaciente: "Bueno",
        descripcionCaso: "Dermatitis crónica",
        archivoAsociado: "fotos_piel.zip",
        MotivoMentoria: "Discutir opciones de tratamiento",
        estatus: true,
      },
      {
        id: 5,
        nombre: "Gabriel Cordoba",
        fNacimiento: "1985-08-20",
        genero: "Masculino",
        especialidad: "Dermatología",
        valoracionPaciente: "Bueno",
        descripcionCaso: "Dermatitis crónica",
        archivoAsociado: "fotos_piel.zip",
        MotivoMentoria: "Discutir opciones de tratamiento",
        estatus: false,
      },
      {
        id: 6,
        nombre: "Gabriela Forgione",
        fNacimiento: "1990-05-15",
        genero: "Femenino",
        especialidad: "Cardiología",
        valoracionPaciente: "Excelente",
        descripcionCaso: "Historial de hipertensión",
        archivoAsociado: "informe.pdf",
        MotivoMentoria: "Aprender más sobre ecocardiografía",
        estatus: true,
      },
      {
        id: 7,
        nombre: "Juan Quijada",
        fNacimiento: "1985-08-20",
        genero: "Masculino",
        especialidad: "Dermatología",
        valoracionPaciente: "Bueno",
        descripcionCaso: "Dermatitis crónica",
        archivoAsociado: "fotos_piel.zip",
        MotivoMentoria: "Discutir opciones de tratamiento",
        estatus: false,
      },
    ];
    setCasosClinicos(pacientes);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonTitle className="titulo-app">Casos clínicos</IonTitle>
        <IonButtons>
          <IonButton
            className="botones-casos"
            onClick={() => {
              setCerrado(false);
            }}
          >
            Cerrados
          </IonButton>
          <IonButton
            className="botones-casos"
            onClick={() => {
              setCerrado(true);
            }}
          >
            Abiertos
          </IonButton>
        </IonButtons>
      </IonHeader>

      <IonSearchbar></IonSearchbar>

      <IonContent>
        <ListaCasos
          casosClinicos={casosClinicos}
          cerrado={cerrado}
          setCasoClinico={setCasosClinicos}
        />
      </IonContent>

      <IonFooter>
        <IonButtons>
          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={home}></IonIcon>
          </IonButton>

          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={chatbox}></IonIcon>
          </IonButton>

          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={folder}></IonIcon>
          </IonButton>

          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={mail}></IonIcon>
          </IonButton>

          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={person}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonFooter>
    </IonPage>
  );
};

export default CasosClinicos;
