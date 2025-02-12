import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import LogoHeader from "../../../components/logo-header/logo-header";
import commonStyles from "../../../common.module.css";
import styles from "./usuarios.module.css";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import { useLogOut } from "../../../store/local-storage";
import {
  useAdmins,
  useRuralProfessionalsAdmins,
  useSpecialistAdmins,
} from "../../../hooks/queries/admin";
import { add, chevronForward, helpOutline } from "ionicons/icons";
import { FaqModal } from "../../../components/FaqModal";

export function AdminUsuarios() {
  const [page, setPage] = useState<"specialist" | "rural" | "admin">(
    "specialist"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // For showing the faq modal
  const [presentFaq, dismissFaq] = useIonModal(FaqModal, {
    dismiss: (data: string, role: string) => dismissFaq(data, role),
  });

  const specialists = useSpecialistAdmins(searchQuery);
  const ruralProfessionals = useRuralProfessionalsAdmins(searchQuery);
  const admins = useAdmins(searchQuery);

  const router = useIonRouter();

  const logOut = useLogOut();

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle
              className={`${commonStyles.header}`}
              style={{ marginBottom: 12 }}
            >
              Gestionar usuarios
            </IonTitle>
            <IonToolbar>
              <IonButtons class={`${commonStyles.centerButtons}`}>
                <IonButton
                  className={`${commonStyles.centerButton}`}
                  onClick={() => {
                    if (page !== "specialist") {
                      setPage("specialist");
                      setSearchQuery("");
                    }
                  }}
                  color="primary"
                  fill={page === "specialist" ? "solid" : "outline"}
                >
                  Especialistas
                </IonButton>
                <IonButton
                  className={`${commonStyles.centerButton}`}
                  onClick={() => {
                    if (page !== "rural") {
                      setPage("rural");
                      setSearchQuery("");
                    }
                  }}
                  color="primary"
                  fill={page === "rural" ? "solid" : "outline"}
                >
                  Profesionales rurales
                </IonButton>
                <IonButton
                  className={`${commonStyles.centerButton}`}
                  onClick={() => {
                    if (page !== "admin") {
                      setPage("admin");
                      setSearchQuery("");
                    }
                  }}
                  color="primary"
                  fill={page === "admin" ? "solid" : "outline"}
                >
                  Administradores
                </IonButton>
                <IonButton
                  className={`${commonStyles.centerButton}`}
                  routerLink="/login"
                  onClick={logOut}
                  color="dark"
                  fill="outline"
                >
                  Cerrar Sesión
                </IonButton>
              </IonButtons>
              <SearchInput
                onSearch={(search) => setSearchQuery(search)}
                label="Buscar usuario"
                placeholder="Nombre, documento, especialidad..."
              />
            </IonToolbar>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading
            isOpen={
              specialists.isLoading ||
              ruralProfessionals.isLoading ||
              admins.isLoading
            }
          />
          {page === "specialist" && (
            <div>
              <IonList>
                {specialists.data?.data?.map((specialist) => (
                  <IonItem
                    key={specialist.document}
                    style={{ paddingRight: 6 }}
                    onClick={() =>
                      router.push(`/especialistas/${specialist.document}`)
                    }
                  >
                    <div className={`${styles.userItem}`}>
                      <IonLabel>
                        <strong className={`${styles.userTitle}`}>
                          {specialist.fullName}
                        </strong>
                      </IonLabel>
                      <IonText>{specialist.speciality}</IonText>
                      <IonText>Cédula: {specialist.document}</IonText>
                      <IonText>Correo: {specialist.email}</IonText>
                      <IonText>
                        Casos retroalimentados: {specialist.feedbackCount || 0}
                      </IonText>
                    </div>
                    <IonIcon slot="end" icon={chevronForward} />
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}

          {page === "rural" && (
            <div>
              <IonList>
                {ruralProfessionals.data?.data?.map((ruralProfessional) => (
                  <IonItem
                    key={ruralProfessional.document}
                    onClick={() =>
                      router.push(
                        `/profesionales-rurales/${ruralProfessional.document}`
                      )
                    }
                  >
                    <div className={`${styles.userItem}`}>
                      <IonLabel>
                        <strong className={`${styles.userTitle}`}>
                          {ruralProfessional.fullName}
                        </strong>
                      </IonLabel>
                      <IonText>
                        Centro de salud: {ruralProfessional.zone}
                      </IonText>
                      <IonText>Cédula: {ruralProfessional.document}</IonText>
                      <IonText>Correo: {ruralProfessional.email}</IonText>
                      <IonText>
                        Casos creados: {ruralProfessional.caseCount}
                      </IonText>
                    </div>
                    <IonIcon slot="end" icon={chevronForward} />
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}

          {page === "admin" && (
            <div>
              <IonList>
                {admins.data?.data?.map((admin) => (
                  <IonItem
                    key={admin.email}
                    onClick={() => router.push(`/admins/${admin.email}`)}
                  >
                    <div className={`${styles.userItem}`}>
                      <IonLabel>
                        <strong className={`${styles.userTitle}`}>
                          {admin.fullName}
                        </strong>
                      </IonLabel>
                      <IonText>Correo: {admin.email}</IonText>
                    </div>
                    <IonIcon slot="end" icon={chevronForward} />
                  </IonItem>
                ))}
              </IonList>
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton color="primary" routerLink="/admins/crear">
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </div>
          )}

          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton color="medium" onClick={() => presentFaq()}>
              <IonIcon icon={helpOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
