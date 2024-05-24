import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonText,
  IonList,
  IonSearchbar,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import {home, chatbox, folder, mail, person} from 'ionicons/icons';
import "./styles.css";

const CasosClinicos: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
          <IonTitle className='titulo-app'>Casos clínicos</IonTitle>
          <IonButtons>
            <IonButton className="botones-casos">Cerrados</IonButton>
            <IonButton className="botones-casos">Abiertos</IonButton>
          </IonButtons>
      </IonHeader>

      <IonSearchbar></IonSearchbar>


      <IonContent>
        <IonList>
          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>

          <IonCard>
            <IonText>
              <h2>Gabriel Cordoba</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis sequi cumque temporibus, delectus minus culpa quos velit magni iste ducimus ipsam quidem praesentium, quia architecto voluptatem exercitationem, quo facere!</p>
            </IonText>
          </IonCard>
        </IonList>
      </IonContent>

      <IonFooter>
        <IonButtons>

          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={home}></IonIcon>
          </IonButton>
          
          <IonButton size="large" className="botones-inferiores">
            <IonIcon icon={chatbox}></IonIcon>
          </IonButton>

          <IonButton size="large" className="botones-inferiores">
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

export default CasosClinicos;
