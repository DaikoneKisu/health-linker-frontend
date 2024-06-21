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
  cerrado,
  dentroCaso,
  chooseCase,
}) => {
  return (
    <div>
      <IonText>
        <h1>hola hermanaos</h1>
      </IonText>
      <IonButton onClick={() => dentroCaso(false)}> boton de regreso</IonButton>
    </div>
  );
};

interface Props {
  casoClinico: CasoClinico;
  cerrado: boolean;
  dentroCaso: (answer: boolean) => void;
  chooseCase: (id: number) => void;
}
