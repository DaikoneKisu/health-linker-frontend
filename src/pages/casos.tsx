  import { IonContent, 
    IonHeader, IonPage, IonTitle, IonButton, 
    IonButtons, IonIcon, IonToolbar, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, 
    IonCardContent, IonText, 
    IonBackButton, IonSearchbar} from '@ionic/react';
    
  import './styles.css'
  import { addCircle, backspace, bluetooth, gitNetwork, search, wifi } from 'ionicons/icons';
  import { useState } from 'react';

  const Casos: React.FC = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const handleSearchClick = () => {
      setShowSearchBar(!showSearchBar);
    };

    return (
      <IonPage>
        {showSearchBar && (
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        )}
        <IonHeader>
          <IonToolbar>
            <IonTitle>Casos clínicos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonButton color ='light' size='small'>
            
              <IonCardHeader>
                <IonCardTitle>Caso 001</IonCardTitle>
                <IonCardSubtitle>Especialidad</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Aquí un breve resumen del caso clínico.
              </IonCardContent>
            
          </IonButton>
          <IonButton color ='light' size='small'>
              <IonCardHeader>
                <IonCardTitle>Caso 002</IonCardTitle>
                <IonCardSubtitle>Especialidad</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Aquí un breve resumen del caso clínico.
              </IonCardContent>
          </IonButton>

          <IonButton color ='light' size='small'>
            
              <IonCardHeader>
                <IonCardTitle>Caso 003</IonCardTitle>
                <IonCardSubtitle>Especialidad</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Aquí un breve resumen del caso clínico.
              </IonCardContent>
            
          </IonButton>

          <IonButton color ='light' size='small'>
            
              <IonCardHeader>
                <IonCardTitle>Caso 004</IonCardTitle>
                <IonCardSubtitle>Especialidad</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Aquí un breve resumen del caso clínico.
              </IonCardContent>
            
          </IonButton>

          <IonButton color ='light' size='small'>
            
              <IonCardHeader>
                <IonCardTitle>Caso 005</IonCardTitle>
                <IonCardSubtitle>Especialidad</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Aquí un breve resumen del caso clínico.
              </IonCardContent>
            
          </IonButton>

        </IonContent>
        
        <IonToolbar>
          <IonButtons slot="end">
            <IonBackButton/>
            <IonButton onClick={handleSearchClick}>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonButtons>
          
        </IonToolbar>
      </IonPage>
    );
  };



export default Casos;
