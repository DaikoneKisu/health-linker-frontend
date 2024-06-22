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
    IonNavLink,
  } from "@ionic/react";
  import {home, chatbox, folder, mail, person} from 'ionicons/icons';
  import "./styles.css";
import { Route } from "react-router";
import ForoX from "./foroX";
  
  const Foros: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
            <IonTitle className='titulo-app'>Foros</IonTitle>
        </IonHeader>
  
        <IonSearchbar></IonSearchbar>
  
  
        <IonContent>
          <IonList>
            <IonCard>
              <IonText>
                <h2>Foro 1</h2>
                <h6>Tema del foro</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
              </IonText>
              <IonNavLink>
                
                <IonButton fill="outline">Entrar al foro</IonButton>
              </IonNavLink>
            </IonCard>
  
          </IonList>
        </IonContent>
  
        <IonFooter>
          <IonButtons>
  
            <IonButton size="large" className="botones-inferiores">
              <IonIcon icon={home}></IonIcon>
            </IonButton>
            
            <IonButton size="large" className="boton-inferior-activo">
              <IonIcon icon={chatbox} color="white"></IonIcon>
            </IonButton>
  
            <IonButton size="large" className="boton-inferior-activo">
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
    );
  };
  
  export default Foros;
  