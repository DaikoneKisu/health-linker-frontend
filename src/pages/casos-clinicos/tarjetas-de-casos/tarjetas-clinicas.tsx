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
import { CasoClinico } from "../types";
import React, { useState, useEffect } from "react";

export const ListaCasos: React.FC<Props> = ({ casosClinicos, cerrado }) => {
  return (
    <IonList>
      {casosClinicos.map((caso) => (
        <div>
          {cerrado == caso.estatus && (
            <div key={caso.id}>
              <IonCard>
                <IonText>
                  <h2>{caso.nombre}</h2>
                  <p>{caso.descripcionCaso}</p>
                </IonText>
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
}
