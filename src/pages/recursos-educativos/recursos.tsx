import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import commonStyles from "../../common.module.css";
import WithAuth from "../../components/WithAuth";
import LogoHeader from "../../components/logo-header/logo-header";
import SearchInput from "../../components/SearchInput";
import { useState } from "react";
import { useResources } from "../../hooks/queries/educational-resources";
import { useAppSelector } from "../../store/hooks";
import { add } from "ionicons/icons";
import TarjetaRecurso from "./tarjeta-recurso";
import { EducationalResource } from "../casos-clinicos/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResource } from "../../api/recursos-educativos";
import { useCommonToast } from "../../hooks/useCommonToast";

export default function RecursosEducativos() {
  const [searchQuery, setSearchQuery] = useState("");

  const [resourceToDelete, setResourceToDelete] =
    useState<EducationalResource | null>(null);

  const [showToast] = useCommonToast();

  const queryClient = useQueryClient();

  const resources = useResources(searchQuery);

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: ({ success, error }) => {
      if (success) {
        showToast("Recurso eliminado con éxito", "success");
        queryClient.invalidateQueries({ queryKey: ["educational-resources"] });
      } else {
        showToast(error, "error");
      }
    },
  });

  const role = useAppSelector((state) => state.role);
  const user = useAppSelector((state) => state.user);

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle
              className={`${commonStyles.header}`}
              style={{ marginBottom: 12 }}
            >
              Recursos Educativos
            </IonTitle>
            <IonToolbar>
              <SearchInput
                onSearch={(value) => setSearchQuery(value)}
                label="Buscar recurso"
                placeholder="Escribe tu búsqueda"
              />
            </IonToolbar>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading isOpen={!resources.data || deleteMutation.isPending} />

          <IonList>
            {resources.data?.data?.map((resource) => (
              <TarjetaRecurso
                key={resource.id}
                recurso={resource}
                onClickDelete={() => setResourceToDelete(resource)}
              />
            ))}
          </IonList>

          {(role === "admin" || user.type === "specialist") && (
            <>
              {/* For creating resources */}
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton color="primary" routerLink="/nuevo-recurso">
                  <IonIcon icon={add} />
                </IonFabButton>
              </IonFab>

              {/* For deleting resources */}
              <IonAlert
                header="Eliminar recurso educativo"
                message="¿Seguro que desea eliminar el recurso? Esta acción no se puede deshacer"
                isOpen={resourceToDelete !== null}
                buttons={[
                  {
                    text: "Cancelar",
                    role: "cancel",
                    handler: () => {
                      setResourceToDelete(null);
                    },
                  },
                  {
                    text: "Eliminar",
                    role: "destructive",
                    handler: () => {
                      if (resourceToDelete) {
                        deleteMutation.mutate(String(resourceToDelete.id));
                        setResourceToDelete(null);
                      }
                    },
                  },
                ]}
              />
            </>
          )}
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
