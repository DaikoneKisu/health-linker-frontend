import {
  IonContent,
  IonHeader,
  IonPage,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  IonImg,
  useIonRouter,
} from "@ionic/react";
import styles from "./login.module.css";
import "./login.css";
import { Form, Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/hooks";
import { useCommonToast } from "../../../hooks/useCommonToast";
import WithUnAuth from "../../../components/WithUnAuth";
import { setAuth } from "../../../store/slices/auth";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import { adminSignIn } from "../../../api/admin";
import { setUser } from "../../../store/slices/user";
import { setRole } from "../../../store/slices/role";
import { useStoreLogin } from "../../../store/local-storage";

const adminLoginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Es obligario ingresar una cédula")
    .email("Ingresa un correo válido"),
  password: Yup.string()
    .trim()
    .required("Es obligatorio ingresar una contraseña"),
});

const AdminLogin = () => {
  const router = useIonRouter();

  const dispatch = useAppDispatch();

  const storeLogin = useStoreLogin();

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
              <h1 color="light" className={`${styles.header}`}>
                Inicia sesión como administrador
              </h1>
            </IonHeader>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={adminLoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                adminSignIn(values.email, values.password).then((data) => {
                  if (data.success) {
                    showToast("Inicio de sesión exitoso", "success");

                    dispatch(setAuth(true));

                    const userItem = {
                      email: values.email,
                      fullName: data.fullName,
                      document: "",
                      password: "",
                      type: "" as "rural professional" | "specialist" | "",
                    };
                    dispatch(
                      setUser({
                        ...userItem,
                        document: "",
                        password: "",
                        type: "",
                      })
                    );
                    dispatch(setRole("admin"));

                    storeLogin(data.token, userItem, "admin", { auth: true });

                    router.push("/dashboard");
                  } else {
                    showToast("Error al iniciar sesión", "error");
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={`${styles.loginForm}`}>
                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <div
                        className={`${styles.loginBgColor} ion-padding-horizontal ${styles.item}`}
                      >
                        <IonInput
                          className={`${styles.textColorLight} ${
                            touched.email ? "ion-touched" : ""
                          } ${errors.email ? "ion-invalid" : "ion-valid"}`}
                          label="Correo electrónico"
                          value={field.value}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          name={field.name}
                          color="light"
                          helperText="Ingresa tu correo electrónico"
                          errorText={errors.email}
                          placeholder="ejemplo@gmail.com"
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
          </div>
        </IonContent>
      </IonPage>
    </WithUnAuth>
  );
};

export default AdminLogin;
