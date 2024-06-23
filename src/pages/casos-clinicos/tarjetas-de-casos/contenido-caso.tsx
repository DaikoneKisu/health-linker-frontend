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
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
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

      <div className="content-div-style">
        <IonText className="text-style">
          Fecha de nacimiento: {casoClinico.fechaNacimiento}
        </IonText>
        <IonText className="text-style">Genero: {casoClinico.genero}</IonText>
        <IonText className="text-style">
          Especialidad requerida: {casoClinico.especialidadRequerida}
        </IonText>
      </div>
      <IonInfiniteScroll style={{ height: "225px", overflow: "auto" }}>
        <IonCard className="card-styles">
          <IonCardHeader>
            <IonCardTitle>Motivo de la mentoría</IonCardTitle>
            <IonCardSubtitle>
              <span>{casoClinico.motivoMentoria}</span>
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonCard className="card-styles">
          <IonCardHeader>
            <IonCardTitle>Descripción caso</IonCardTitle>
            <IonCardSubtitle>
              <span>{casoClinico.descripcionCaso}</span>
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonCard className="card-styles">
          <IonCardHeader>
            <IonCardTitle>Valoración del paciente:</IonCardTitle>
            <IonCardSubtitle>
              <span>{casoClinico.valoracionPaciente}</span>
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonInfiniteScroll>

      <IonFooter></IonFooter>
    </div>
  );
};

interface Props {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}
