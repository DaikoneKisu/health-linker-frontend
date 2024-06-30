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
  IonNote,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { Formik, Field, Form, FieldProps, useField } from "formik";
import { getSpecialities } from "../../../api/register";
import { type CrearCasoClinico, Especialidad } from "../types";
import { DateTime } from "luxon";
import { createClinicalCase } from "../../../api/casos-clinicos";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import LogoHeader from "../../../components/logo-header/logo-header";
import * as Yup from "yup";

const crearCasoClinicoSchema = Yup.object({
  descripcionCaso: Yup.string()
    .trim()
    .required("Es obligatorio ingresar una descripción para el caso")
    .max(500, "La descripción del caso está limitada a 500 caracteres"),
  valoracionPaciente: Yup.string()
    .trim()
    .required(
      "Es obligatorio ingresar una valoración del paciente para el caso"
    )
    .max(500, "La valoración del paciente está limitada a 500 caracteres"),
  motivoMentoria: Yup.string()
    .trim()
    .required("Es obligatorio ingresar un motivo de mentoría para el caso")
    .max(500, "El motivo de mentoría está limitado a 500 caracteres"),
  especialidadRequerida: Yup.number()
    .required("Es obligatorio ingresar una especialidad requerida para el caso")
    .integer("Es obligatorio ingresar una especialidad requerida para el caso")
    .positive(
      "Es obligatorio ingresar una especialidad requerida para el caso"
    ),
  fechaNacimiento: Yup.string()
    .trim()
    .required(
      "Es obligatorio ingresar una fecha de nacimiento del paciente para el caso"
    ),
  genero: Yup.string()
    .trim()
    .required("Es obligatorio ingresar el género del paciente para el caso"),
  motivoPaciente: Yup.string()
    .trim()
    .required("Es obligatorio ingresar un motivo del paciente para el caso")
    .max(500, "El motivo del paciente está limitado a 500 caracteres"),
  archivosAsociados: Yup.array().of(Yup.mixed()).nullable(),
});

const CrearCasoClinico = () => {
  const [specialties, setSpecialties] = useState<Especialidad[]>([]);
  const datetimeId = useId();
  const router = useIonRouter();

  useIonViewWillEnter(() => {
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
          validationSchema={crearCasoClinicoSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
          {({ isSubmitting, errors, touched }) => (
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
                      <div>
                        <IonTextarea
                          className={`${
                            touched.descripcionCaso ? "ion-touched" : ""
                          } ${
                            errors.descripcionCaso ? "ion-invalid" : "ion-valid"
                          }`}
                          label="Descripción"
                          helperText="Indica una descripción breve del caso"
                          counter={true}
                          maxlength={500}
                          rows={1}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                          errorText={errors.descripcionCaso}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="valoracionPaciente">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonTextarea
                          className={`${
                            touched.valoracionPaciente ? "ion-touched" : ""
                          } ${
                            errors.valoracionPaciente
                              ? "ion-invalid"
                              : "ion-valid"
                          }`}
                          label="Valoración"
                          helperText="Indica la valoración objetiva que se le da al paciente"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                          errorText={errors.valoracionPaciente}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="motivoMentoria">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonTextarea
                          className={`${
                            touched.motivoMentoria ? "ion-touched" : ""
                          } ${
                            errors.motivoMentoria ? "ion-invalid" : "ion-valid"
                          }`}
                          label="Motivo"
                          helperText="Indica la razón por la cual se solicita mentoría"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                          errorText={errors.motivoMentoria}
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="especialidadRequerida">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonSelect
                          className={`${
                            touched.especialidadRequerida ? "ion-touched" : ""
                          } ${
                            errors.especialidadRequerida
                              ? "ion-invalid"
                              : "ion-valid"
                          }`}
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
                        <div
                          style={{
                            paddingTop: "5px",
                            paddingBottom: 0,
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: `1px solid ${
                              errors.especialidadRequerida
                                ? "var(--ion-color-danger)"
                                : "var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))))"
                            }`,
                          }}
                        >
                          <IonNote
                            style={{
                              fontSize: "0.75rem",
                              color: errors.especialidadRequerida
                                ? "var(--ion-color-danger)"
                                : "var(--ion-text-color-step-450)",
                            }}
                          >
                            {errors.especialidadRequerida
                              ? errors.especialidadRequerida
                              : "Selecciona una especialidad"}
                          </IonNote>
                        </div>
                      </div>
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
                      <>
                        <IonItem>
                          <IonLabel style={{ userSelect: "none" }}>
                            Fecha de nacimiento
                          </IonLabel>
                          <IonDatetimeButton datetime={datetimeId} />
                          <IonPopover keepContentsMounted={true}>
                            <IonDatetime
                              className={`${
                                touched.fechaNacimiento ? "ion-touched" : ""
                              } ${
                                errors.fechaNacimiento
                                  ? "ion-invalid"
                                  : "ion-valid"
                              }`}
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
                        <IonNote
                          style={{
                            fontSize: "0.75rem",
                            color: errors.fechaNacimiento
                              ? "var(--ion-color-danger)"
                              : "var(--ion-text-color-step-450)",
                          }}
                        >
                          {errors.fechaNacimiento
                            ? errors.fechaNacimiento
                            : "Indica la fecha de nacimiento del paciente"}
                        </IonNote>
                      </>
                    )}
                  </Field>
                  <Field name="genero">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonSelect
                          className={`${touched.genero ? "ion-touched" : ""} ${
                            errors.genero ? "ion-invalid" : "ion-valid"
                          }`}
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
                        <div
                          style={{
                            paddingTop: "5px",
                            paddingBottom: 0,
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: `1px solid ${
                              errors.genero
                                ? "var(--ion-color-danger)"
                                : "var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))))"
                            }`,
                          }}
                        >
                          <IonNote
                            style={{
                              fontSize: "0.75rem",
                              color: errors.genero
                                ? "var(--ion-color-danger)"
                                : "var(--ion-text-color-step-450)",
                            }}
                          >
                            {errors.genero
                              ? errors.genero
                              : "Indica el género del paciente"}
                          </IonNote>
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field name="motivoPaciente">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonTextarea
                          className={`${
                            touched.motivoPaciente ? "ion-touched" : ""
                          } ${
                            errors.motivoPaciente ? "ion-invalid" : "ion-valid"
                          }`}
                          label="Motivo"
                          helperText="Indica la razón por la cual el paciente asistió a consulta en un principio"
                          counter={true}
                          rows={1}
                          maxlength={500}
                          autoGrow
                          name={field.name}
                          onIonInput={field.onChange}
                          onIonBlur={field.onBlur}
                          value={field.value}
                          errorText={errors.motivoPaciente}
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
