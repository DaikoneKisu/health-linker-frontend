import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  IonFooter,
  IonItem,
  useIonRouter,
} from "@ionic/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { registerRuralProfessional } from "../../../api/register";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../common.module.css";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import WithUnAuth from "../../../components/WithUnAuth";

const ProfesionalRural: React.FC = () => {
  const router = useIonRouter();

  return (
    <WithUnAuth>
      <IonPage>
        <LogoHeader primary />
        <IonContent className={`${commonStyles.bgPrimary}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <main style={{ marginTop: "10px" }}>
              <IonHeader className={`${commonStyles.bgPrimary} ion-no-border`}>
                <IonTitle color="light" className={`${commonStyles.header}`}>
                  Registro de profesional rural
                </IonTitle>
              </IonHeader>
              <Formik
                initialValues={{
                  fullName: "",
                  document: "",
                  email: "",
                  zone: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  registerRuralProfessional(
                    values.zone,
                    values.document,
                    values.email,
                    values.fullName,
                    values.password
                  ).then((data) => {
                    if (data.success) {
                      alert("Usuario registrado satisfactoriamente.");
                      router.push("/login");
                    } else {
                      alert("No se ha podido registrar al profesional rural.");
                    }
                    setSubmitting(false);
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className={`${commonStyles.form}`}>
                    <Field name="fullName">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
                            label="Nombre Completo"
                            value={field.value}
                            onIonChange={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                          />
                        </IonItem>
                      )}
                    </Field>
                    <Field name="document">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
                            label="Cédula"
                            value={field.value}
                            onIonChange={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                          ></IonInput>
                        </IonItem>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
                            label="Correo"
                            value={field.value}
                            onIonChange={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                          ></IonInput>
                        </IonItem>
                      )}
                    </Field>
                    <Field name="zone">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
                            label="Zona"
                            value={field.value}
                            onIonChange={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                          ></IonInput>
                        </IonItem>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
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
                    <Field name="confirmPassword">
                      {({ field }: FieldProps) => (
                        <IonItem
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight}`}
                            label="Confirmar contraseña"
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
                      className={`${commonStyles.lightButton}`}
                      type="submit"
                      color="light"
                      fill="solid"
                      disabled={isSubmitting}
                      style={{ paddingTop: "20px" }}
                    >
                      Registrarte
                    </IonButton>
                    <ResetOnLeave />
                  </Form>
                )}
              </Formik>
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
};

export default ProfesionalRural;
