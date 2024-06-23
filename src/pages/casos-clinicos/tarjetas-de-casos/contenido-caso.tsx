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

export const CasoIndividual: React.FC<Props> = ({
  casoClinico,
  dentroCaso,
}) => {
  return (
    <div className="init-div-style">
      <IonHeader class="header-style">
        <IonTitle className="tittle-style">Health-Linker</IonTitle>
        <IonText className="subtittle-style">Casos Clínicos</IonText>
      </IonHeader>

      <IonButton className="botones-caso" onClick={() => dentroCaso(false)}>
        boton de regreso
      </IonButton>

      <IonFooter></IonFooter>
    </div>
  );
};

interface Props {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}
