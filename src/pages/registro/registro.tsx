import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  IonFooter,
} from "@ionic/react";
import LogoHeader from "../../components/logo-header/logo-header";
import styles from "./registro.module.css";
import commonStyles from "./common.module.css";
import WithUnAuth from "../../components/WithUnAuth";

const Registro: React.FC = () => (
  <WithUnAuth>
    <IonPage>
      <LogoHeader primary />
      <IonContent color="primary">
        <div className={`${styles.contentContainer}`}>
          <main className={`${styles.mainContent}`}>
            <IonHeader className="ion-no-border">
              <IonTitle color="light" className={`${commonStyles.header}`}>
                ¿Con qué rol quieres registrarte?
              </IonTitle>
            </IonHeader>
            <IonButton
              type="button"
              routerLink="/registro/profesional-rural"
              className={`${commonStyles.lightButton}`}
              color="light"
              fill="solid"
            >
              Profesional rural
            </IonButton>
            <IonButton
              type="button"
              routerLink="/registro/especialista"
              className={`${commonStyles.lightButton}`}
              color="light"
              fill="solid"
            >
              Especialista
            </IonButton>
          </main>
          <IonFooter className={`${commonStyles.footer} ion-no-border`}>
            <IonTitle color="light" className={`${commonStyles.header}`}>
              ¿Ya tienes cuenta?
            </IonTitle>
            <IonButton
              type="button"
              routerLink="/login"
              className={`${commonStyles.lightButton}`}
              color="light"
              fill="solid"
            >
              Iniciar sesión
            </IonButton>
          </IonFooter>
        </div>
      </IonContent>
    </IonPage>
  </WithUnAuth>
);

export default Registro;
