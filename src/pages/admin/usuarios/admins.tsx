import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../../../common.module.css";
import styles from "./usuarios.module.css";
import { RouteComponentProps } from "react-router";
import { useAdmin } from "../../../hooks/queries/admin";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { useMutation } from "@tanstack/react-query";
import { updateAdminPassword } from "../../../api/admin";
import * as Yup from "yup";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";

interface Props extends RouteComponentProps<{ email: string }> {}

const passwordSchema = Yup.object({
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

export default function AdminEdit({ match }: Props) {
  const { data, isLoading } = useAdmin(match.params.email);

  const updateMutation = useMutation({
    mutationFn: updateAdminPassword,
  });

  const [showToast] = useCommonToast();

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${commonStyles.header}`}>
              Detalle del administrador
            </IonTitle>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading isOpen={isLoading || updateMutation.isPending} />

          {!!data?.data && (
            <div>
              <section className={`${styles.userSection} ion-padding`}>
                <h2>Datos del administrador</h2>
                <div className={`${styles.userDiv}`}>
                  <IonText>Nombre: {data.data.fullName}</IonText>
                  <IonText>Correo: {data.data.email}</IonText>
                </div>
              </section>

              <section className={`${styles.userSection} ion-padding`}>
                <h2>Reestablecer contraseña</h2>
                <Formik
                  initialValues={{ password: "" }}
                  validationSchema={passwordSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    updateMutation.mutate(
                      {
                        email: match.params.email,
                        password: values.password,
                      },
                      {
                        onSuccess: ({ success, error }) => {
                          setSubmitting(false);
                          if (success) {
                            showToast("Contraseña actualizada", "success");
                          } else {
                            showToast(error, "error");
                          }
                        },
                      }
                    );
                  }}
                >
                  {({ errors, isSubmitting }) => (
                    <Form>
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
                        style={{ fontWeight: "bold", marginTop: 8 }}
                        disabled={isSubmitting}
                      >
                        Reestablecer contraseña
                      </IonButton>
                      <ResetOnLeave />
                    </Form>
                  )}
                </Formik>
              </section>
            </div>
          )}
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
