import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonCard,
    IonButtons,
    IonBackButton,
    IonText,
    IonList,
    IonToolbar
  } from "@ionic/react";
  import {home, chatbox, folder, mail, person} from 'ionicons/icons';
  import "./styles.css";
import { Route } from "react-router";
  
  const ForoX: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton>Volver</IonBackButton>
                </IonButtons>
            
                <IonTitle className='titulo-app'>Foro X</IonTitle>
            </IonToolbar>
            <IonText>
                <h6>Tema del foro</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
        </IonHeader>
  


  
       
      </IonPage>
    );
  };
  
  export default ForoX;