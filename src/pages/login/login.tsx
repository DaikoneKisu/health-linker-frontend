import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonFooter,
  IonInputPasswordToggle,
  IonImg,
  useIonRouter,
} from "@ionic/react";
import { signin } from "../../api/auth";
import WithUnAuth from "../../components/WithUnAuth";
import styles from "./login.module.css";
import "./login.css";
import { Form, Formik, Field, FieldProps } from "formik";
import ResetOnLeave from "../../components/helpers/reset-on-leave";
import * as Yup from "yup";
import { useCommonToast } from "../../hooks/useCommonToast";

const loginSchema = Yup.object({
  document: Yup.string()
    .trim()
    .required("Es obligario ingresar una cédula")
    .matches(/^\d+$/, {
      excludeEmptyString: true,
      message: "La cédula debe contener solo números",
    })
    .length(10, "La cédula debe tener exactamente 10 números"),
  password: Yup.string()
    .trim()
    .required("Es obligatorio ingresar una contraseña"),
});

const Login = () => {
  const router = useIonRouter();

  // Set up result toast
  const [showToast] = useCommonToast();

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
                <IonImg src="/login.png" alt="Imagen de healthlinker" />
              </div>
              <IonTitle color="light" className={`${styles.header}`}>
                Inicia sesión para continuar
              </IonTitle>
            </IonHeader>
            <Formik
              initialValues={{ document: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                signin(values.document, values.password).then((data) => {
                  if (data.success) {
                    // alert("Inicio de sesión exitoso");
                    showToast("Inicio de sesión exitoso", "success");
                    localStorage.setItem("token", data.token);
                    router.push("/casos-clinicos");
                  } else {
                    // alert("Error al iniciar sesión");
                    showToast("Error al iniciar sesión", "error");
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={`${styles.loginForm}`}>
                  <Field name="document">
                    {({ field }: FieldProps) => (
                      <div
                        className={`${styles.loginBgColor} ion-padding-horizontal ${styles.item}`}
                      >
                        <IonInput
                          className={`${styles.textColorLight} ${
                            touched.document ? "ion-touched" : ""
                          } ${errors.document ? "ion-invalid" : "ion-valid"}`}
                          label="Cédula"
                          value={field.value}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          name={field.name}
                          color="light"
                          helperText="Ingresa tu cédula de identidad, debe tener 10 números"
                          errorText={errors.document}
                          placeholder="1713175071"
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <div
                        className={`${styles.loginBgColor} ion-padding-horizontal ${styles.item}`}
                      >
                        <IonInput
                          className={`${styles.textColorLight} ${
                            touched.password ? "ion-touched" : ""
                          } ${errors.password ? "ion-invalid" : "ion-valid"}`}
                          label="Contraseña"
                          type="password"
                          value={field.value}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          name={field.name}
                          color="light"
                          helperText="Ingresa tu contraseña"
                          errorText={errors.password}
                          placeholder="********"
                          clearOnEdit={false}
                        >
                          <IonInputPasswordToggle
                            slot="end"
                            color="light"
                          ></IonInputPasswordToggle>
                        </IonInput>
                      </div>
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
                  <ResetOnLeave />
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
