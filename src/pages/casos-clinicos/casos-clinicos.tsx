import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonButtons,
  IonButton,
  IonMenuButton,
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

const CasosClinicos: React.FC = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);

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
    },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonTitle className="titulo-app">Casos clínicos</IonTitle>
        <IonButtons>
          <IonButton className="botones-casos">Cerrados</IonButton>
          <IonButton className="botones-casos">Abiertos</IonButton>
        </IonButtons>
      </IonHeader>

      <IonSearchbar></IonSearchbar>

      <IonContent>
        <IonList>
          {pacientes.map((caso) => (
            <div key={caso.id}>
              <IonCard>
                <IonText>
                  <h2>{caso.nombre}</h2>
                  <p>{caso.descripcionCaso}</p>
                </IonText>
              </IonCard>
            </div>
          ))}
        </IonList>
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
