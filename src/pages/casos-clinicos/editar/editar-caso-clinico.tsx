import "./editar-caso-clinico.css";
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
  useIonLoading,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { Formik, Field, Form, FieldProps, useField } from "formik";
import { getSpecialities } from "../../../api/register";
import { CasoClinico, type CrearCasoClinico, EditCasoClinico, Especialidad } from "../types";
import { DateTime } from "luxon";
import { createClinicalCase, updateClinicalCase, getCase } from "../../../api/casos-clinicos";
import ResetOnLeave from "../../../components/helpers/reset-on-leave";
import LogoHeader from "../../../components/logo-header/logo-header";
import * as Yup from "yup";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { RouteComponentProps } from "react-router";
import { dice } from "ionicons/icons";




/**
 * Clinical case schema
 */
const crearCasoClinicoSchema = Yup.object({
  descripcionCaso: Yup.string()
    .trim()
    .required("Es obligatorio ingresar una descripción para el caso")
    .max(800, "La descripción del caso está limitada a 800 caracteres"),
  valoracionPaciente: Yup.string()
    .trim()
    .required(
      "Es obligatorio ingresar una valoración del paciente para el caso"
    )
    .max(800, "La valoración del paciente está limitada a 800 caracteres"),
  motivoMentoria: Yup.string()
    .trim()
    .required("Es obligatorio ingresar un motivo de mentoría para el caso")
    .max(800, "El motivo de mentoría está limitado a 800 caracteres"),
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
    .max(800, "El motivo del paciente está limitado a 800 caracteres"),
  archivosAsociados: Yup.array().of(Yup.mixed()).nullable(),
});


/**
 * Clinical case form
 */
interface Props extends RouteComponentProps<{ id: string }> {}

const EditarCasoClinico: React.FC<Props> = ({ match }) => {
  const [specialties, setSpecialties] = useState<Especialidad[]>([]);
  const datetimeId = useId();
  const router = useIonRouter();

  const [caso, setCaso] = useState<CasoClinico | null>(null);
  const[present, dismiss] = useIonLoading();
  const[loading, setLoading] = useState(true);
  useIonViewWillEnter(() => {
    const fetchData = async () => {
      present({ spinner: "circles" });
      try {
        const caseData = await getCase(Number(match.params.id));
        const specialtiesData = await getSpecialities();
        if (caseData.success && specialtiesData.success) {
          setCaso(caseData.data!);
          setSpecialties(specialtiesData.specialties);
        } else {
          router.canGoBack() ? router.goBack() : router.push("/casos-clinicos");
          alert("Error al cargar el caso clínico o las especialidades");
        }
      } catch (error) {
        console.error("Error:", error);
        router.canGoBack() ? router.goBack() : router.push("/casos-clinicos");
        alert("Error al cargar el caso clínico o las especialidades");
      } finally {
        dismiss();
        setLoading(false);
        
      }
    };

    fetchData();
  });

  useEffect(() => {
    if (caso?.fechaNacimiento) {
      console.log(caso.fechaNacimiento);
    }
  }, [caso]);

  // For API response toast
  const [showToast] = useCommonToast();
  
  const parseFechaNacimiento = (fecha: string): string => {
    const formatos = ['d/M/yyyy, HH:mm:ss', 'dd/MM/yyyy, HH:mm:ss'];
    for (const formato of formatos) {
      const dt = DateTime.fromFormat(fecha, formato);
      if (dt.isValid) return dt.toISO();
    }

    return DateTime.now()
    .set({ second: 0, millisecond: 0 })
    .toISO()
  }

  return (
    <IonPage>
      <LogoHeader />
      <IonContent>
        { !caso ? (
          <div>Loading...</div>
        ) : (
        <Formik
          initialValues={
            {
              id: caso?.id || 0,
              descripcionCaso: caso?.descripcionCaso || "a",
              valoracionPaciente: caso?.valoracionPaciente || "",
              motivoMentoria: caso?.motivoMentoria || "",
              especialidadRequerida: specialties.find(specialty => specialty.name === caso?.especialidadRequerida)?.id || 1,
              fechaNacimiento: parseFechaNacimiento(caso.fechaNacimiento),
              genero: caso?.genero || "masculino",
              motivoPaciente: caso?.motivoPaciente || "",
              archivosAsociados: null,
            } satisfies EditCasoClinico
          }
          validationSchema={crearCasoClinicoSchema}
          onSubmit={(values, { setSubmitting }) => {console.log("Se manda", values)
            updateClinicalCase(values).then((data) => {
              console.log(values)
              if (data.success) {
                // alert("Caso clínico creado satisfactoriamente");
                showToast("Caso clínico editado satisfactoriamente", "success");
                router.push("/casos-clinicos");
              } else {
                // alert("Error al crear el caso clínico");
                showToast("Error al editar el caso clínico", "error");
              }
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <header>
                <h2>Editar caso clínico</h2>
              </header>

              {/* Case data */}
              <IonCard className="form-card">
                <IonCardHeader>
                  <IonCardTitle>Datos del caso</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Field name="id">
                    {({ field }: FieldProps) => (
                      <div>
                        <IonTextarea
                          className={`${
                              touched.descripcionCaso ? "ion-touched" : ""
                            } ${
                              errors.descripcionCaso ? "ion-invalid" : "ion-valid"
                            }`}
                          label="ID Caso"
                          helperText="Identificador del caso"
                          name={field.name}
                          value={field.value}
                          readonly
                        />
                      </div>
                    )}
                  </Field>
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
                          maxlength={800}
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
                          maxlength={800}
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
                          maxlength={800}
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

              {/* Patient data */}
              <IonCard className="form-card">
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
                          maxlength={800}
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

              {/* Files */}
              <IonCard className="form-card">
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
                  type="submit"
                  className="save-button"
                  fill="solid"
                  disabled={isSubmitting}
                >
                  Guardar
                </IonButton>
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
              </div>
              <ResetOnLeave />
            </Form>
          )}
        </Formik>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditarCasoClinico;

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
