import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import commonStyles from "../../common.module.css";
import styles from "./recursos.module.css";
import WithAuth from "../../components/WithAuth";
import LogoHeader from "../../components/logo-header/logo-header";
import { Field, FieldProps, Form, Formik } from "formik";
import ResetOnLeave from "../../components/helpers/reset-on-leave";
import { useCommonToast } from "../../hooks/useCommonToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createResource } from "../../api/recursos-educativos";

const resourceSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Es obligario ingresar un título")
    .max(254, "El correo está limitado a 254 caracteres"),
  content: Yup.string()
    .trim()
    .required("Es obligario ingresar un contenido")
    .max(1000, "El contenido está limitado a 1000 caracteres"),
});

export default function CrearRecurso() {
  const [showToast] = useCommonToast();
  const router = useIonRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createResource,
  });

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle
              className={`${commonStyles.header}`}
              style={{ marginBottom: 12 }}
            >
              Crear Recurso Educativo
            </IonTitle>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <Formik
            initialValues={{ title: "", content: "" }}
            validationSchema={resourceSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              createMutation.mutate(
                {
                  title: values.title,
                  content: values.content,
                },
                {
                  onSuccess: ({ success, error }) => {
                    setSubmitting(false);
                    if (success) {
                      showToast(
                        "Recurso educativo creado con éxito",
                        "success"
                      );
                      queryClient.invalidateQueries({
                        queryKey: ["educational-resources"],
                      });
                      router.push("/recursos");
                    } else {
                      showToast(error, "error");
                    }
                  },
                }
              );
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className={`${styles.resourceForm} ion-padding`}>
                <Field name="title">
                  {({ field }: FieldProps) => (
                    <IonInput
                      className={`${errors.title ? "ion-invalid" : ""}`}
                      required
                      label="Título"
                      labelPlacement="stacked"
                      placeholder="Introduzca el título del recurso"
                      fill="outline"
                      type="text"
                      value={field.value}
                      name={field.name}
                      errorText={errors.title}
                      onIonBlur={field.onBlur}
                      onIonInput={field.onChange}
                      clearOnEdit={false}
                    />
                  )}
                </Field>
                <Field name="content">
                  {({ field }: FieldProps) => (
                    <IonTextarea
                      className={`${errors.content ? "ion-invalid" : ""}`}
                      required
                      label="Contenido"
                      labelPlacement="stacked"
                      placeholder="Introduzca el contenido del recurso (tips, enlaces, etc.)"
                      fill="outline"
                      value={field.value}
                      name={field.name}
                      errorText={errors.content}
                      onIonBlur={field.onBlur}
                      onIonInput={field.onChange}
                      clearOnEdit={false}
                      autoGrow
                    />
                  )}
                </Field>
                <IonButton
                  type="submit"
                  style={{ fontWeight: "bold" }}
                  disabled={isSubmitting}
                >
                  Crear recurso
                </IonButton>
                <IonButton type="button" fill="outline" routerLink="/recursos">
                  Salir
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
