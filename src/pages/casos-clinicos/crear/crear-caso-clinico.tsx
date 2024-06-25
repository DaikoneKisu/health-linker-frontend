import "./crear-caso-clinico.css";
import { useEffect, useId, useRef, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { Formik, Field, Form, FieldProps, useField } from "formik";
import { getSpecialities } from "../../../api/register";
import { type CrearCasoClinico, Especialidad } from "../types";
import { DateTime } from "luxon";
import { createClinicalCase } from "../../../api/casos-clinicos";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import LogoHeader from "../../../components/logo-header/logo-header";

const CrearCasoClinico = () => {
  const [specialties, setSpecialties] = useState<Especialidad[]>([]);
  const datetimeId = useId();
  const router = useIonRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecialities();
      if (data.success) {
        setSpecialties(data.specialties);
      } else {
        console.error("Error:", data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <LogoHeader />
      <IonContent>
        <Formik
          initialValues={
            {
              descripcionCaso: "",
              valoracionPaciente: "",
              motivoMentoria: "",
              especialidadRequerida: 1,
              fechaNacimiento: DateTime.now()
                .set({ second: 0, millisecond: 0 })
                .toISO(),
              genero: "masculino",
              motivoPaciente: "",
              archivosAsociados: null,
            } satisfies CrearCasoClinico
          }
          onSubmit={(values, { setSubmitting }) => {
            createClinicalCase(values).then((data) => {
              if (data.success) {
                alert("Caso clínico creado satisfactoriamente");
                router.push("/casos-clinicos");
              } else {
                alert("Error al crear el caso clínico");
              }
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <header>
                <h2>Crear caso clínico</h2>
              </header>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos del caso</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Field name="descripcionCaso">
                    {({ field }: FieldProps) => (
                      <div className="ion-padding-start">
                        <IonTextarea
                          label="Descripción"
                          helperText="Descripción breve del caso"
                          counter={true}
                          maxlength={500}
                          rows={1}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="valoracionPaciente">
                    {({ field }: FieldProps) => (
                      <div className="ion-padding-start">
                        <IonTextarea
                          label="Valoración"
                          helperText="Valoración objetiva que se le da al paciente"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="motivoMentoria">
                    {({ field }: FieldProps) => (
                      <div className="ion-padding-start">
                        <IonTextarea
                          label="Motivo"
                          helperText="Razón por la cual se solicita mentoría"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonChange={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="especialidadRequerida">
                    {({ field }: FieldProps) => (
                      <IonItem>
                        <IonSelect
                          label="Especialidad requerida"
                          interface="popover"
                          name={field.name}
                          onIonChange={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        >
                          {specialties.map((specialty: Especialidad) => (
                            <IonSelectOption
                              value={specialty.id}
                              key={specialty.id}
                            >
                              {specialty.name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    )}
                  </Field>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos del paciente</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Field name="fechaNacimiento">
                    {({ field }: FieldProps) => (
                      <IonItem>
                        <IonLabel style={{ userSelect: "none" }}>
                          Fecha de nacimiento
                        </IonLabel>
                        <IonDatetimeButton datetime={datetimeId} />
                        <IonPopover keepContentsMounted={true}>
                          <IonDatetime
                            id={datetimeId}
                            presentation="date-time"
                            name={field.name}
                            onIonChange={(e) => {
                              const value = e.target.value;
                              if (value == null || Array.isArray(value)) {
                                return;
                              }

                              const datetime = DateTime.fromISO(value);
                              e.target.value = datetime.toISO();

                              field.onChange(e);
                            }}
                            onIonBlur={field.onBlur}
                            value={field.value}
                          />
                        </IonPopover>
                      </IonItem>
                    )}
                  </Field>
                  <Field name="genero">
                    {({ field }: FieldProps) => (
                      <IonItem>
                        <IonSelect
                          label="Género"
                          interface="popover"
                          name={field.name}
                          onIonChange={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        >
                          <IonSelectOption value="masculino">
                            Masculino
                          </IonSelectOption>
                          <IonSelectOption value="femenino">
                            Femenino
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  </Field>
                  <Field name="motivoPaciente">
                    {({ field }: FieldProps) => (
                      <div className="ion-padding-start">
                        <IonTextarea
                          label="Motivo"
                          helperText="Razón por la cual el paciente asistió a consulta en un principio"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                        />
                      </div>
                    )}
                  </Field>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Archivos asociados</IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <FilesInput />
                </IonCardContent>
              </IonCard>
              <div className="form-actions">
                <IonButton
                  type="button"
                  className="cancel-button"
                  fill="solid"
                  color="danger"
                  disabled={isSubmitting}
                  onClick={() => {
                    router.canGoBack()
                      ? router.goBack()
                      : router.push("/casos-clinicos");
                  }}
                >
                  Cancelar
                </IonButton>
                <IonButton
                  type="submit"
                  className="save-button"
                  fill="solid"
                  disabled={isSubmitting}
                >
                  Guardar
                </IonButton>
              </div>
              <ResetOnLeave />
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default CrearCasoClinico;

const FilesInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesField, _filesMeta, filesHelpers] = useField<File[] | null>(
    "archivosAsociados"
  );

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        name={filesField.name}
        onChange={(e) => {
          filesHelpers.setValue(
            e.target.files == null ? null : Array.from(e.target.files)
          );
        }}
        accept="image/png,image/jpeg,image/avif,image/webp,application/pdf"
      />
      <IonButton
        className="upload-button"
        fill="outline"
        onClick={() => inputRef.current?.click()}
      >
        Subir archivos
      </IonButton>
      {!(filesField.value == null || filesField.value.length <= 0) && (
        <IonList>
          <IonListHeader>
            <IonLabel>Archivos actualmente subidos</IonLabel>
          </IonListHeader>
          {filesField.value.map((file) => (
            <IonItem key={`${file.name}-${file.lastModified}-${file.size}`}>
              <IonLabel>{file.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    </>
  );
};
