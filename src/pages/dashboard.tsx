import { IonContent, IonMenuButton, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonFooter, IonText, IonIcon, IonMenu, IonItemDivider, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import {home, arrowBack, person, today} from 'ionicons/icons';
import './dashboard.css';

const Dashboard: React.FC = () => {
return (

    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton autoHide={false}></IonMenuButton>
                </IonButtons>

                <IonTitle className='titulo-app'>HealthLinker</IonTitle>
                <IonButtons slot='end'>
                    <IonButton shape='round'>
                        <IonIcon icon={person}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        
            <IonTitle>Dr. Greenie Warren</IonTitle>

            <IonButtons className='botones-dashboard'>
                <IonButton className='boton-dashboard'>Historias clínicas</IonButton>
                <IonButton className='boton-dashboard'>Casos clínicos</IonButton>
                <IonButton className='boton-dashboard'>Pendientes</IonButton>
            </IonButtons>
            <IonItemDivider></IonItemDivider>
            </IonHeader>

<IonContent>
        <h2>Calendario</h2>
        <h6>Aquí va el calendario :D</h6>
        <h2></h2>
        <h2></h2>
        <h2></h2>
        <h2></h2>
        <h2></h2>
        <h2></h2>
</IonContent>

        <IonFooter>
            <IonToolbar>
                <IonButtons className='botones-inf'>
                    <IonButton >
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonButton>
                    <IonButton>
                        <IonIcon icon={home}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonFooter>
    </IonPage>

);
};

export default Dashboard;