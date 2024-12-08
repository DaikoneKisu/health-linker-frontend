import TarjetaDeCasoAbierto from "../../casos-clinicos/tarjetas-de-casos/tarjeta-de-caso-abierto-admin";
import TarjetaDeCasoCerrado from "../../casos-clinicos/tarjetas-de-casos/tarjeta-de-caso-cerrado";
import { CasoClinicoAdmin } from "../../casos-clinicos/types";
import "../../casos-clinicos/lista-de-casos.css";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import { useSpecialistsBySpeciality } from "../../../hooks/queries/admin";
import { arrowBack } from "ionicons/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignCase } from "../../../api/casos-clinicos";
import { useCommonToast } from "../../../hooks/useCommonToast";

interface Props {
  casos: CasoClinicoAdmin[];
  cerrado: boolean;
  getCases: () => void;
}

const ListaDeCasosAdmin = ({ casos, cerrado, getCases }: Props) => {
  const [casoAsignar, setCasoAsignar] = useState<CasoClinicoAdmin | null>(null);

  return (
    <IonList>
      {casos.length === 0 && cerrado && (
        <p style={{ textAlign: "center" }}>No hay casos cerrados</p>
      )}
      {casos.length === 0 && !cerrado && (
        <p style={{ textAlign: "center" }}>No se hallaron casos</p>
      )}
      {cerrado
        ? casos.map((c) => (
            <TarjetaDeCasoCerrado
              caso={c}
              key={c.id}
              getCases={getCases}
              isAdmin
            />
          ))
        : casos.map((c) => (
            <TarjetaDeCasoAbierto
              caso={c}
              key={c.id}
              onAssign={() => setCasoAsignar(c)}
            />
          ))}

      {!cerrado && (
        <>
          <ModalAsignar
            caso={casoAsignar}
            onDismiss={() => setCasoAsignar(null)}
          />
        </>
      )}
    </IonList>
  );
};

function ModalAsignar({
  caso,
  onDismiss,
}: {
  caso: CasoClinicoAdmin | null;
  onDismiss: () => void;
}) {
  const [showToast] = useCommonToast();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");

  const { data: specialists, isLoading } = useSpecialistsBySpeciality({
    search: searchQuery,
    specialityId: caso && caso.specialityId ? caso.specialityId : 0,
  });

  const assignMutation = useMutation({
    mutationFn: assignCase,
    onSuccess: (data) => {
      if (data.success) {
        showToast("Caso asignado correctamente", "success");
        queryClient.invalidateQueries({
          queryKey: ["clinical-cases", "assigned"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clinical-cases", "not-assigned"],
        });
        onDismiss();
      } else {
        showToast("Error al asignar el caso", "error");
      }
    },
  });

  return (
    <IonModal isOpen={caso !== null} onIonModalWillDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={onDismiss}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Asignar caso a especialista</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={assignMutation.isPending} />
        <SearchInput
          onSearch={(search: string) => setSearchQuery(search)}
          label="Buscar especialista"
          placeholder="Buscar por nombre"
        />
        <IonList>
          {isLoading && <p>Cargando especialistas...</p>}
          {specialists?.data?.map((specialist) => (
            <IonCard key={specialist.document}>
              <IonCardHeader>
                <IonCardTitle>{specialist.fullName}</IonCardTitle>
                <IonCardSubtitle>Cédula: {specialist.document}</IonCardSubtitle>
              </IonCardHeader>
              <IonToolbar className="ion-card-footer">
                <IonButtons>
                  <IonButton
                    fill="solid"
                    color="primary"
                    onClick={() => {
                      if (caso) {
                        assignMutation.mutate({
                          id: caso.id,
                          specialistDocument: specialist.document,
                        });
                      }
                    }}
                  >
                    Asignar
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default ListaDeCasosAdmin;
