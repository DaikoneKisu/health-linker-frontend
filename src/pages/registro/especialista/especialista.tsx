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
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter,
  IonNote,
  useIonModal,
  useIonToast,
  IonText,
} from "@ionic/react";
import { useRef, useState } from "react";
import { registerSpecialist, getSpecialities } from "../../../api/register";
import { Especialidad } from "../../casos-clinicos/types";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../common.module.css";
import { Field, FieldProps, Form, Formik } from "formik";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import WithUnAuth from "../../../components/WithUnAuth";
import * as Yup from "yup";
import ConsentModal from "../ConsentModal";

/**
 * Validation schema for specialist
 */
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
  phoneNumber: Yup.string()
    .trim()
    .required("Es obligatorio ingresar su número de teléfono")
    .matches(/^\d+$/, {
      excludeEmptyString: true,
      message: "El teléfono debe contener solo números",
    })
    .min(9, "El número debe tener al menos 9 caracteres")
    .max(15, "El número no puede superar los 15 caracteres"),
});

/**
 * Sign up page for specialist
 */
const Especialista = () => {
  const [listaEspecialista, setListaEspecialista] = useState<Especialidad[]>(
    []
  );
  const router = useIonRouter();

  // Set up consent modal
  const formRef = useRef(null);
  const [presentModal, dismissModal] = useIonModal(ConsentModal, {
    dismiss: (data: string, role: string) => dismissModal(data, role),
    formRef: formRef,
  });

  function openModal() {
    presentModal();
  }

  // Set up result toast
  const [presentToast] = useIonToast();

  function showToast(message: string, state: "success" | "error") {
    presentToast({
      message,
      duration: 1500,
      position: "top",
      color: state === "error" ? "warning" : "success",
    });
  }

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
                innerRef={formRef}
                initialValues={{
                  fullName: "",
                  document: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  specialtyId: 1,
                  phoneNumber: "",
                }}
                validationSchema={especialistaSchema}
                onSubmit={(values, { setSubmitting }) => {
                  registerSpecialist(
                    values.specialtyId,
                    values.document,
                    values.email,
                    values.fullName,
                    values.password,
                    values.phoneNumber
                  ).then((data) => {
                    if (data.success) {
                      // alert("Usuario registrado satisfactoriamente.");
                      showToast(
                        "Usuario registrado satisfactoriamente.",
                        "success"
                      );
                      router.push("/login");
                    } else {
                      // alert("No se ha podido registrar al especialista.");
                      showToast(
                        "No se ha podido registrar al especialista.",
                        "error"
                      );
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

                    <Field name="phoneNumber">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.phoneNumber ? "ion-touched" : ""
                            } ${
                              errors.phoneNumber ? "ion-invalid" : "ion-valid"
                            }`}
                            label="Número de teléfono"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            id={field.name}
                            name={field.name}
                            color="light"
                            helperText="Ingresa tu número de teléfono (sin el código de país)"
                            errorText={errors.phoneNumber}
                            placeholder="112223333"
                          >
                            <IonText
                              slot="start"
                              className={commonStyles.countryCodeItem}
                            >
                              <img src="ecuador.svg" height="16px"></img> (+593)
                            </IonText>
                          </IonInput>
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
                              id="togglePassword"
                            />
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
                              id="toggleConfirm"
                            />
                          </IonInput>
                        </div>
                      )}
                    </Field>

                    <IonButton
                      className={`${commonStyles.lightButton}`}
                      type="button"
                      color="light"
                      fill="solid"
                      disabled={isSubmitting}
                      style={{ paddingTop: "20px" }}
                      onClick={openModal}
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
