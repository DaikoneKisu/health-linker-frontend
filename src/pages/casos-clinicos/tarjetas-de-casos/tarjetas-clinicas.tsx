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
  IonFooter,
  IonIcon,
} from "@ionic/react";
import { CasoClinico } from "../types";
import React, { useState, useEffect } from "react";
import "./styles.css";

export const ListaCasos: React.FC<Props> = ({
  casosClinicos,
  cerrado,
  setCasoClinico,
}) => {
  useEffect(() => {
    console.log("useEffecteado");
  }, [casosClinicos]);
  return (
    <IonList>
      {casosClinicos.map((caso) => (
        <div>
          {cerrado == caso.estatus && (
            <div key={caso.id} className="card-styles">
              <IonCard>
                <IonText>
                  <h2>{caso.nombre}</h2>
                  <p>{caso.descripcionCaso}</p>
                </IonText>
                <IonButton
                  onClick={() => {
                    casosClinicos.splice(caso.id - 1, 1);
                    console.log(casosClinicos);
                  }}
                >
                  Eliminar
                </IonButton>
                <IonButton>Editar</IonButton>
              </IonCard>
            </div>
          )}
        </div>
      ))}
    </IonList>
  );
};

interface Props {
  casosClinicos: CasoClinico[];
  cerrado: boolean;
  setCasoClinico: React.Dispatch<React.SetStateAction<CasoClinico[]>>;
}
