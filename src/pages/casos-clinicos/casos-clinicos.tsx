import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import { home, chatbox, folder, mail, person, add } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import React, { useState, useEffect } from "react";
import { ListaCasos } from "./tarjetas-de-casos/tarjetas-clinicas";
import WithAuth from "../../components/WithAuth";
import { Redirect } from "react-router";
import { getCases } from "../../api/casos-clinicos";
import { CasoIndividual } from "./tarjetas-de-casos/contenido-caso";
interface Props {
  children: JSX.Element;
}

const logOut = (): JSX.Element => {
  localStorage.removeItem("token");
  return <Redirect to="/login" />;
};

const CasosClinicos: React.FC = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);
  const [cerrado, setCerrado] = useState(false);
  const [dentroCaso, setDentroCaso] = useState(false);
  const [caso, setCaso] = useState(0);

  const chooseCase = (id: number) => {
    setCaso(id);
  };

  const isInside = (answer: boolean) => {
    setDentroCaso(answer);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCases();
      if (data.success) {
        console.log("Casos:", data.data);
      } else {
        console.error("Error:", data.error);
      }
    };

    fetchData();
  }, []);

  const pacientes: CasoClinico[] = [
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

  useEffect(() => {
    setCasosClinicos(pacientes);
  }, []);

  return (
    <WithAuth>
      <IonPage>
        <IonHeader>
          <IonTitle class="titulo-casos">Casos clínicos</IonTitle>
          {dentroCaso && (
            <CasoIndividual
              casoClinico={pacientes[caso]}
              dentroCaso={isInside}
            />
          )}
          {!dentroCaso && (
            <IonButtons>
              <IonButton
                className="botones-casos"
                onClick={() => {
                  setCerrado(false);
                }}
              >
                casos cerrados
              </IonButton>
              <IonButton
                className="botones-casos"
                onClick={() => {
                  setCerrado(true);
                }}
              >
                Mis casos abiertos
              </IonButton>
              <IonButton
                className="botones-casos"
                onClick={() => {
                  logOut();
                }}
              >
                Cerrar Sesion
              </IonButton>
            </IonButtons>
          )}
        </IonHeader>

        <IonContent>
          {!dentroCaso && (
            <ListaCasos
              casosClinicos={pacientes}
              cerrado={cerrado}
              dentroCaso={isInside}
              chooseCase={chooseCase}
            />
          )}
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton color="light">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
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
    </WithAuth>
  );
};

export default CasosClinicos;
