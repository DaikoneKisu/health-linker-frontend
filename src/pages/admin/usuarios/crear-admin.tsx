import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../../../common.module.css";
import styles from "./usuarios.module.css";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "../../../api/admin";
import * as Yup from "yup";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";

const adminSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Es obligario ingresar un correo")
    .email(
      "El correo debe seguir el formato de un correo electrónico (correo@email.com)"
    )
    .max(254, "El correo está limitado a 254 caracteres"),
  fullName: Yup.string()
    .trim()
    .required("Es obligario ingresar un nombre")
    .max(100, "El nombre completo está limitado a 100 caracteres"),
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
});

export default function AdminCreate() {
  const createMutation = useMutation({
    mutationFn: createAdmin,
  });

  const [showToast] = useCommonToast();
  const queryClient = useQueryClient();
  const router = useIonRouter();

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${commonStyles.header}`}>
              Crear administrador
            </IonTitle>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <Formik
            initialValues={{ email: "", fullName: "", password: "" }}
            validationSchema={adminSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              createMutation.mutate(
                {
                  email: values.email,
                  fullName: values.fullName,
                  password: values.password,
                },
                {
                  onSuccess: ({ success, error }) => {
                    setSubmitting(false);
                    if (success) {
                      showToast(
                        "Cuenta de administrador creada con éxito",
                        "success"
                      );
                      queryClient.invalidateQueries({ queryKey: ["admins"] });
                      router.push("/usuarios");
                    } else {
                      showToast(error, "error");
                    }
                  },
                }
              );
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className={`${styles.adminForm} ion-padding`}>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <IonInput
                      className={`${errors.email ? "ion-invalid" : ""}`}
                      required
                      label="Correo electrónico"
                      labelPlacement="stacked"
                      placeholder="Introduzca el correo del administrador"
                      fill="outline"
                      type="email"
                      value={field.value}
                      name={field.name}
                      errorText={errors.email}
                      onIonBlur={field.onBlur}
                      onIonInput={field.onChange}
                      clearOnEdit={false}
                    />
                  )}
                </Field>
                <Field name="fullName">
                  {({ field }: FieldProps) => (
                    <IonInput
                      className={`${errors.fullName ? "ion-invalid" : ""}`}
                      required
                      label="Nombre completo"
                      labelPlacement="stacked"
                      placeholder="Introduzca el nombre del administrador"
                      fill="outline"
                      type="text"
                      value={field.value}
                      name={field.name}
                      errorText={errors.fullName}
                      onIonBlur={field.onBlur}
                      onIonInput={field.onChange}
                      clearOnEdit={false}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <IonInput
                      className={`${styles.search} ${
                        errors.password ? "ion-invalid" : ""
                      }`}
                      required
                      label="Nueva contraseña"
                      labelPlacement="stacked"
                      placeholder="Introduzca la nueva contraseña"
                      fill="outline"
                      type="password"
                      value={field.value}
                      name={field.name}
                      errorText={errors.password}
                      onIonBlur={field.onBlur}
                      onIonInput={field.onChange}
                      clearOnEdit={false}
                    >
                      <IonInputPasswordToggle slot="end" />
                    </IonInput>
                  )}
                </Field>
                <IonButton
                  type="submit"
                  style={{ fontWeight: "bold" }}
                  disabled={isSubmitting}
                >
                  Crear administrador
                </IonButton>
                <ResetOnLeave />
              </Form>
            )}
          </Formik>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
