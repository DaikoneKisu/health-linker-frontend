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
import { person } from "ionicons/icons";
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
      <IonIcon
        icon={person}
        style={{ width: 128, height: 128, paddingTop: 10, paddingBottom: 10 }}
      ></IonIcon>

      <div style={{ padding: 10 }}></div>
      <div className="init-div-style">
        <IonText className="text-style">
          Fecha de nacimiento: {casoClinico.fechaNacimiento}
        </IonText>
        <IonText className="text-style">Genero: {casoClinico.genero}</IonText>
        <IonText className="text-style">
          Especialidad requerida: {casoClinico.especialidadRequerida}
        </IonText>
        <IonText className="text-style">
          Motivo de la mentoría: {casoClinico.motivoMentoria}
        </IonText>
      </div>

      <IonList>
        <IonCard>
          <IonText>testing bro</IonText>
        </IonCard>
      </IonList>

      <IonFooter></IonFooter>
    </div>
  );
};

interface Props {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}
