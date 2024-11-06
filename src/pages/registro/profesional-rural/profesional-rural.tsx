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
  useIonModal,
  IonText,
} from "@ionic/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { registerRuralProfessional } from "../../../api/register";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../common.module.css";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import WithUnAuth from "../../../components/WithUnAuth";
import * as Yup from "yup";
import ConsentModal from "../ConsentModal";
import { useRef } from "react";
import { useCommonToast } from "../../../hooks/useCommonToast";

/**
 * Validation schema for rural professional registration
 */
const profesionalRuralSchema = Yup.object({
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
    .required("Es obligatorio ingresar un correo")
    .email(
      "El correo debe seguir el formato de un correo electrónico (correo@email.com)"
    )
    .max(254, "El correo está limitado a 254 caracteres"),
  zone: Yup.string()
    .trim()
    .required("Es obligatorio ingresar un centro de salud")
    .max(256, "El centro de salud está limitado a 256 caracteres"),
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
 * Sign up page for rural professional
 */
const ProfesionalRural = () => {
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
  const [showToast] = useCommonToast();

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
                innerRef={formRef}
                initialValues={{
                  fullName: "",
                  document: "",
                  email: "",
                  phoneNumber: "",
                  zone: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={profesionalRuralSchema}
                onSubmit={(values, { setSubmitting }) => {
                  registerRuralProfessional(
                    values.zone,
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
                      // alert("No se ha podido registrar al profesional rural.");
                      showToast(
                        "No se ha podido registrar al profesional rural.",
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
                            id={field.name}
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
                            id={field.name}
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
                            } ${errors.phoneNumber ? "ion-invalid" : "ion-valid"}`}
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

                    <Field name="zone">
                      {({ field }: FieldProps) => (
                        <div
                          className={`${commonStyles.bgPrimary} ion-padding-horizontal ${commonStyles.item}`}
                        >
                          <IonInput
                            className={`${commonStyles.textColorLight} ${
                              touched.zone ? "ion-touched" : ""
                            } ${errors.zone ? "ion-invalid" : "ion-valid"}`}
                            label="Centro de salud"
                            value={field.value}
                            onIonInput={field.onChange}
                            onIonBlur={field.onBlur}
                            id={field.name}
                            name={field.name}
                            color="light"
                            helperText="Ingresa el centro de salud en que estás haciendo la rural"
                            errorText={errors.zone}
                            placeholder="Hospital Rural San José"
                          ></IonInput>
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
                            id={field.name}
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
                            id={field.name}
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

export default ProfesionalRural;
