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
  IonCardContent,
  IonItemDivider,
  IonItemSliding,
  IonItem,
} from "@ionic/react";
import { CasoClinico } from "../types";
import { add, pencil, trash } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./styles.css";

export const ListaCasos: React.FC<Props> = ({
  casosClinicos,
  cerrado,
  dentroCaso,
  chooseCase,
}) => {
  return (
    <IonList style={{ width: "100%" }}>
      {casosClinicos.map((caso) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {cerrado == caso.estatus && (
            <div key={caso.id} className="card-styles">
              <IonText
                style={{ width: "100%" }}
                onClick={() => {
                  chooseCase(caso.id);
                  dentroCaso(true);
                }}
              >
                <h2 className="caso-nombre">{caso.nombre}</h2>
                <p className="caso-desc">{caso.descripcionCaso}</p>
              </IonText>
              <IonButtons slot="start">
                <IonButton size="large">
                  <IonIcon icon={pencil} />
                </IonButton>
                <IonButton size="large">
                  <IonIcon icon={trash} />
                </IonButton>
              </IonButtons>
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
  dentroCaso: (answer: boolean) => void;
  chooseCase: (id: number) => void;
}
