import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonFooter,
  IonInputPasswordToggle,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import { signin } from "../../api/auth";
import WithUnAuth from "../../components/WithUnAuth";
import styles from "./login.module.css";
import { Form, Formik, Field, FieldProps } from "formik";

const Login: React.FC = () => {
  const history = useHistory();

  return (
    <WithUnAuth>
      <IonPage>
        <IonContent className={`${styles.loginBgColor}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100dvh",
            }}
          >
            <IonHeader className={`${styles.loginBgColor} ion-no-border`}>
              <div className={styles.heroImgContainer}>
                <IonImg src="/public/login.png" alt="Imagen de healthlinker" />
              </div>
              <IonTitle color="light" className={`${styles.header}`}>
                Inicia sesión para continuar
              </IonTitle>
            </IonHeader>
            <Formik
              initialValues={{ document: "", password: "" }}
              onSubmit={(values, { setSubmitting }) => {
                signin(values.document, values.password).then((data) => {
                  if (data.success) {
                    alert("Inicio de sesión exitoso");
                    localStorage.setItem("token", data.token);
                    history.push("/CasosClinicos");
                  } else {
                    alert("Error al iniciar sesión");
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ isSubmitting }) => (
                <Form className={`${styles.loginForm}`}>
                  <Field name="document">
                    {({ field }: FieldProps) => (
                      <IonItem
                        className={`${styles.loginBgColor} ion-padding-horizontal`}
                      >
                        <IonInput
                          className={`${styles.textColorLight}`}
                          label="Cédula"
                          value={field.value}
                          onIonChange={field.onChange}
                          onIonBlur={field.onBlur}
                          name={field.name}
                          color="light"
                        />
                      </IonItem>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <IonItem
                        className={`${styles.loginBgColor} ion-padding-horizontal`}
                      >
                        <IonInput
                          className={`${styles.textColorLight}`}
                          label="Contraseña"
                          type="password"
                          value={field.value}
                          onIonChange={field.onChange}
                          onIonBlur={field.onBlur}
                          name={field.name}
                          color="light"
                        >
                          <IonInputPasswordToggle
                            slot="end"
                            color="light"
                          ></IonInputPasswordToggle>
                        </IonInput>
                      </IonItem>
                    )}
                  </Field>
                  <IonButton
                    className={`${styles.loginButton}`}
                    type="submit"
                    color="light"
                    fill="solid"
                    disabled={isSubmitting}
                  >
                    Iniciar sesión
                  </IonButton>
                </Form>
              )}
            </Formik>
            <IonFooter className={`${styles.loginFooter} ion-no-border`}>
              <IonTitle color="light" className={`${styles.header}`}>
                ¿No tienes cuenta?
              </IonTitle>
              <IonButton
                type="button"
                routerLink="/registro"
                className={`${styles.registerButton}`}
                fill="solid"
                color="light"
              >
                Registro
              </IonButton>
            </IonFooter>
          </div>
        </IonContent>
      </IonPage>
    </WithUnAuth>
  );
};

export default Login;
