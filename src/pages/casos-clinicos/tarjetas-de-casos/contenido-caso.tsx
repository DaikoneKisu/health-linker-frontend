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

export const CasoIndividual: React.FC<Props> = ({
  casoClinico,
  dentroCaso,
}) => {
  return (
    <div>
      <IonText>
        <h3>{casoClinico.nombre}</h3>
      </IonText>
      <IonButton onClick={() => dentroCaso(false)}>boton de regreso</IonButton>
    </div>
  );
};

interface Props {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}
