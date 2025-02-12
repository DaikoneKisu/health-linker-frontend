import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import LogoHeader from "../../../components/logo-header/logo-header";
import styles from "./especialidades.module.css";
import commonStyles from "../../../common.module.css";
import { useSpecialities } from "../../../hooks/queries/others";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addSpeciality, editSpeciality } from "../../../api/admin";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { pencil } from "ionicons/icons";

export default function AdminEspecialidades() {
  const specialities = useSpecialities();

  const modalRef = useRef<HTMLIonModalElement>(null);
  const [showUpdModal, setShowUpdModal] = useState(false);

  const [specialityName, setSpecialityName] = useState("");
  const [editingId, setEditingId] = useState(0);

  const [showToast] = useCommonToast();

  const addMutation = useMutation({
    mutationFn: addSpeciality,
    onSuccess: (data) => {
      if (data.success) {
        showToast("Especialidad agregada con éxito", "success");
        setSpecialityName("");
        modalRef.current?.dismiss();
        specialities.refetch();
      } else {
        showToast("Error agregando especialidad", "error");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: editSpeciality,
    onSuccess: (data) => {
      if (data.success) {
        showToast("Especialidad editada con éxito", "success");
        setSpecialityName("");
        setShowUpdModal(false);
        specialities.refetch();
      } else {
        showToast("Error editando especialidad", "error");
      }
    },
  });

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${commonStyles.header}`}>
              Especialidades Médicas
            </IonTitle>
            <IonToolbar>
              <IonButtons className={`${styles.buttons}`}>
                <IonButton
                  fill="solid"
                  color="primary"
                  className={`${styles.button}`}
                  id="open-modal"
                >
                  Agregar especialidad
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading isOpen={specialities.isLoading} />
          <IonList>
            {specialities.data?.specialties?.map((speciality) => (
              <IonItem key={speciality.name}>
                <IonLabel>{speciality.name}</IonLabel>
                <IonButton
                  size="small"
                  onClick={() => {
                    setSpecialityName(speciality.name);
                    setEditingId(speciality.id);
                    setShowUpdModal(true);
                  }}
                >
                  Editar
                  <IonIcon icon={pencil} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonContent>

        {/* Crear especialidad */}
        <IonModal ref={modalRef} trigger="open-modal">
          <IonHeader className="ion-padding">
            <IonTitle>Agregar especialidad</IonTitle>
          </IonHeader>
          <IonContent className="ion-padding">
            <form
              className={`${styles.createForm}`}
              onSubmit={(e) => {
                e.preventDefault();
                addMutation.mutate(specialityName);
              }}
            >
              <IonInput
                label="Nombre de la especialidad"
                placeholder="Introduzca el nombre"
                labelPlacement="stacked"
                type="text"
                value={specialityName}
                onIonInput={(e) => setSpecialityName(String(e.target.value))}
              />
              <IonButton
                fill="solid"
                color="primary"
                type="submit"
                disabled={addMutation.isPending}
              >
                Guardar
              </IonButton>
            </form>
          </IonContent>
        </IonModal>

        {/* Modificar especialidad */}
        <IonModal isOpen={showUpdModal}>
          <IonHeader className="ion-padding">
            <IonTitle>Editar especialidad</IonTitle>
          </IonHeader>
          <IonContent className="ion-padding">
            <form
              className={`${styles.createForm}`}
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate({ id: editingId, name: specialityName });
              }}
            >
              <IonInput
                label="Nombre de la especialidad"
                placeholder="Introduzca el nombre"
                labelPlacement="stacked"
                type="text"
                value={specialityName}
                onIonInput={(e) => setSpecialityName(String(e.target.value))}
              />
              <IonButton
                fill="solid"
                color="primary"
                type="submit"
                disabled={addMutation.isPending}
              >
                Guardar
              </IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonPage>
    </WithAuth>
  );
}
