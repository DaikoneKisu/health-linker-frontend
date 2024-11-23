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
import ReactQuill from 'react-quill';
import QuillEditor from "../../components/QuillEditor";

const resourceSchema = Yup.object().shape({
  title: Yup.string().required('El título es requerido'),
  content: Yup.string().required('El contenido no puede estar vacío')
});

interface CrearRecursoValues {
  title: string;
  content: string;
}


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
              console.log(values)
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
            {({ errors, isSubmitting, touched }) => (
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
                  {({ field, form }: FieldProps) => (
                    <div>
                      <QuillEditor 
                        field={field} 
                        form={form} 
                        placeholder="Ingresa el contenido del recurso educativo"
                      />
                      {errors.content && touched.content && (
                      <div className="error">{errors.content}</div>
                    )}
                    </div>
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
