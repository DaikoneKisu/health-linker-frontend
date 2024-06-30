import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  IonFooter,
  useIonRouter,
  IonItem,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter,
  IonNote,
} from "@ionic/react";
import { useState } from "react";
import { registerSpecialist, getSpecialities } from "../../../api/register";
import { Especialidad } from "../../casos-clinicos/types";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../common.module.css";
import { Field, FieldProps, Form, Formik } from "formik";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import WithUnAuth from "../../../components/WithUnAuth";
import * as Yup from "yup";

const especialistaSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Es obligario ingresar un nombre")
    .max(100, "El nombre completo está limitado a 100 caracteres"),
  document: Yup.string()
    .trim()
    .required("Es obligario ingresar una cédula")
    .matches(/^\d+$/, {
      excludeEmptyString: true,
      message: "La cédula debe contener solo números",
    })
    .length(10, "La cédula debe tener exactamente 10 números"),
  email: Yup.string()
    .trim()
    .required("Es obligario ingresar un correo")
    .email(
      "El correo debe seguir el formato de un correo electrónico (correo@email.com)"
    )
    .max(254, "El correo está limitado a 254 caracteres"),
  password: Yup.string()
    .trim()
    .required("Es obligatorio ingresar una contraseña")
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      excludeEmptyString: true,
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(60, "La contraseña está limitada a 60 caracteres"),
  confirmPassword: Yup.string()
    .trim()
    .required("Es obligatorio confirmar la contraseña")
    .equals(
      [Yup.ref("password")],
      "La confirmación de la contraseña no coincide con la contraseña ingresada"
    ),
  specialtyId: Yup.number()
    .required("Es obligario seleccionar una especialidad")
    .integer("Es obligario seleccionar una especialidad")
    .positive("Es obligario seleccionar una especialidad"),
});

const Especialista: React.FC = () => {
  const [listaEspecialista, setListaEspecialista] = useState<Especialidad[]>(
    []
  );
  const router = useIonRouter();

  useIonViewWillEnter(() => {
    const fetchData = async () => {
      const data = await getSpecialities();
      if (data.success) {
        setListaEspecialista(data.specialties);
      } else {
        console.error("Error:", data.error);
      }
    };

    fetchData();
  }, []);

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
                  Registro de especialista
                </IonTitle>
              </IonHeader>
              <Formik
                initialValues={{
                  fullName: "",
                  document: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  specialtyId: 1,
                }}
                validationSchema={especialistaSchema}
                onSubmit={(values, { setSubmitting }) => {
                  registerSpecialist(
                    values.specialtyId,
                    values.document,
                    values.email,
                    values.fullName,
                    values.password
                  ).then((data) => {
                    if (data.success) {
                      alert("Usuario registrado satisfactoriamente.");
                      router.push("/login");
                    } else {
                      alert("No se ha podido registrar al especialista.");
                    }
                    setSubmitting(false);
                  });
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className={`${commonStyles.form}`}>
                    <Field name="fullName">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.fullName ? "ion-touched" : ""
                            } ${errors.fullName ? "ion-invalid" : "ion-valid"}`}
                            label="Nombre Completo"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                            helperText="Ingresa tu nombre completo"
                            errorText={errors.fullName}
                            placeholder="Juan Marcelo Perez Lopez"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="document">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
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
                          ></IonInput>
                        </div>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.email ? "ion-touched" : ""
                            } ${errors.email ? "ion-invalid" : "ion-valid"}`}
                            label="Correo"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                            helperText="Ingresa tu correo"
                            errorText={errors.email}
                            placeholder="miCorreo@email.com"
                          ></IonInput>
                        </div>
                      )}
                    </Field>
                    <Field name="specialtyId">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonSelect
                            className={`${commonStyles.textColorLight} ${
                              touched.specialtyId ? "ion-touched" : ""
                            } ${
                              errors.specialtyId ? "ion-invalid" : "ion-valid"
                            }`}
                            label="Especialidad"
                            interface="popover"
                            name={field.name}
                            onIonChange={field.onChange}
                            onIonBlur={field.onBlur}
                            value={field.value}
                            color="light"
                          >
                            {listaEspecialista.map((lista: Especialidad) => (
                              <IonSelectOption value={lista.id} key={lista.id}>
                                {lista.name}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          <div
                            style={{
                              paddingTop: "5px",
                              paddingBottom: 0,
                              display: "flex",
                              justifyContent: "space-between",
                              borderTop: `1px solid ${
                                errors.specialtyId
                                  ? "var(--ion-color-danger)"
                                  : "var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))))"
                              }`,
                            }}
                          >
                            <IonNote
                              style={{
                                fontSize: "0.75rem",
                                color: errors.specialtyId
                                  ? "var(--ion-color-danger)"
                                  : "var(--ion-text-color-step-450)",
                              }}
                            >
                              {errors.specialtyId
                                ? errors.specialtyId
                                : "Selecciona tu especialidad"}
                            </IonNote>
                          </div>
                        </div>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.password ? "ion-touched" : ""
                            } ${errors.password ? "ion-invalid" : "ion-valid"}`}
                            label="Contraseña"
                            type="password"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                            helperText="Ingresa tu contraseña. Debe contener un número, una letra minúscula y una letra mayúscula"
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
                    <Field name="confirmPassword">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.confirmPassword ? "ion-touched" : ""
                            } ${
                              errors.confirmPassword
                                ? "ion-invalid"
                                : "ion-valid"
                            }`}
                            label="Confirmar contraseña"
                            type="password"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            name={field.name}
                            color="light"
                            helperText="Vuelve a ingresar tu contraseña"
                            errorText={errors.confirmPassword}
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

export default Especialista;
