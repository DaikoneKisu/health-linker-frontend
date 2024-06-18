import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonButtons,
    IonFooter,
    IonText,
    IonIcon,
    IonInputPasswordToggle,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption
  } from "@ionic/react";
  import "./login.css";
  import { arrowForwardCircle, pencil} from "ionicons/icons";
  import { Route } from "react-router";
  
  const Registro: React.FC = () => {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
            <IonTitle>HealthLinker</IonTitle>
        </IonHeader>

        <IonContent>

            <div>
            <h3 className="h2-t">Registro de especialista</h3>
            </div>
            
            <IonInput id="input-hl" label="Nombre"></IonInput>
            <IonInput id="input-hl" label="Cédula"></IonInput>
            <IonInput id="input-hl" label="Correo"></IonInput>
            
            <div>
            <h6>Especialidad</h6>

            <IonPicker>
                <IonPickerColumn value="esp">
                    <IonPickerColumnOption value="" disabled={true}>
                        --
                    </IonPickerColumnOption>
                    <IonPickerColumnOption value="esp">Enfermero especialista</IonPickerColumnOption>
                    <IonPickerColumnOption value="ped">Médico pediatra</IonPickerColumnOption>
                    <IonPickerColumnOption value="int">Médico internista</IonPickerColumnOption>
                    <IonPickerColumnOption value="obs">Médico obstetra</IonPickerColumnOption>
                    <IonPickerColumnOption value="psc">Psicólogo</IonPickerColumnOption>
                    <IonPickerColumnOption value="ntr">Nutricionista</IonPickerColumnOption>
                    <IonPickerColumnOption value="fsi">Fisioterapeuta</IonPickerColumnOption>
                </IonPickerColumn>
            </IonPicker>
            </div>
            <IonInput id="input-hl" label="Contraseña" type="password">
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
            <IonInput id="input-hl" label="Confirmar contraseña" type="password">
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
            
        
          <IonButton>Registro</IonButton>
        <div>
          <h6>¿Ya tienes una cuenta?</h6>
          <IonButton size="small" routerLink="/home">Iniciar sesión</IonButton>
        </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Registro;
  