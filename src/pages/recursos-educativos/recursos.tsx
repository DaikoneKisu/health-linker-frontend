import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
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

export default function RecursosEducativos() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = useResources(searchQuery);

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
          <IonLoading isOpen={resources.isLoading} />

          <IonList>
            {resources.data?.data?.map((resource) => (
              <IonItem key={resource.id}></IonItem>
            ))}
          </IonList>

          {(role === "admin" || user.type === "specialist") && (
            <IonFab slot="fixed" horizontal="end" vertical="bottom">
              <IonFabButton color="primary" routerLink="/recursos/nuevo">
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
