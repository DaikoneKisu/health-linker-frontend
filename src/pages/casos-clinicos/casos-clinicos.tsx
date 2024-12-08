import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  useIonViewWillEnter,
  IonLoading,
  IonToolbar,
  useIonModal,
  useIonViewWillLeave,
} from "@ionic/react";
import { add, helpOutline } from "ionicons/icons";
import "./styles.css";
import { useState } from "react";
import WithAuth from "../../components/WithAuth";
import ListaDeCasos from "./lista-de-casos";
import LogoHeader from "../../components/logo-header/logo-header";
import styles from "./casos-clinicos.module.css";
import { getMe } from "../../api/auth";
import ListaDeCasosEspecialistas from "./lista-de-casos-especialistas";
import SearchInput from "../../components/SearchInput";
import { useLogOut } from "../../store/local-storage";
import { FaqModal } from "../../components/FaqModal";
import {
  useClosedCasesCurrentUser,
  useLibraryCases,
  useOpenCasesCurrentUser,
  useRequiredCurrentSpecialistCases,
} from "../../hooks/queries/clinical-cases";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";

const CasosClinicos = () => {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [caseState, setCaseState] = useState<
    "abiertos" | "cerrados" | "mentoreables" | "biblioteca"
  >("abiertos");

  const userFromStore = useAppSelector((state) => state.user);

  const logOut = useLogOut();

  // For showing the faq modal
  const [presentFaq, dismissFaq] = useIonModal(FaqModal, {
    dismiss: (data: string, role: string) => dismissFaq(data, role),
  });

  // Clinical cases queries
  const { data: openCasesData, isLoading: openCasesLoading } =
    useOpenCasesCurrentUser({
      page,
      currentSearch,
      document: user?.document ?? "",
      enabled: user !== null,
    });

  const { data: closedCasesData, isLoading: closedCasesLoading } =
    useClosedCasesCurrentUser({
      page,
      currentSearch,
      document: user?.document ?? "",
      enabled: user !== null,
    });

  const { data: requiredCasesData, isLoading: requiredCasesLoading } =
    useRequiredCurrentSpecialistCases({
      page,
      currentSearch,
      document: user?.document ?? "",
      enabled: userFromStore?.type === "specialist" && user !== null,
    });

  const { data: libraryCasesData, isLoading: libraryCasesLoading } =
    useLibraryCases({ page, currentSearch, enabled: user !== null });

  const queryClient = useQueryClient();

  const showLoader =
    caseState === "abiertos"
      ? openCasesLoading
      : caseState === "cerrados"
      ? closedCasesLoading
      : caseState === "mentoreables"
      ? requiredCasesLoading
      : libraryCasesLoading;

  const getCasesQueryKey =
    caseState === "abiertos"
      ? (["clinical-cases", "open"] as const)
      : caseState === "cerrados"
      ? (["clinical-cases", "closed"] as const)
      : caseState === "mentoreables"
      ? (["clinical-cases", "specialist"] as const)
      : (["clinical-cases", "library"] as const);

  const casesList =
    caseState === "abiertos"
      ? openCasesData
      : caseState === "cerrados"
      ? closedCasesData
      : caseState === "mentoreables"
      ? requiredCasesData
      : libraryCasesData;

  useIonViewWillEnter(() => {
    getMe().then((data) => {
      if (data.success) {
        setUser({ ...data.user, type: data.user.userType });
      } else {
        console.error("Error:", data.error);
      }
    });
  }, []);

  useIonViewWillLeave(() => {
    setUser(null);
  });

  const onSearch = (value: string) => {
    setCurrentSearch(value);
  };

  return (
    <WithAuth>
      <IonPage>
        {user && user.userType === "rural professional" && (
          <>
            <LogoHeader>
              <IonHeader className="header-style ion-no-border">
                <IonTitle className={`${styles.header}`}>
                  Casos Clínicos
                </IonTitle>
                <IonToolbar>
                  <IonButtons class={`${styles.buttons}`}>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "cerrados") {
                          setCaseState("cerrados");
                        }
                      }}
                      color="primary"
                      fill={caseState === "cerrados" ? "solid" : "outline"}
                    >
                      Mis casos cerrados
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "abiertos") {
                          setCaseState("abiertos");
                        }
                      }}
                      color="primary"
                      fill={caseState === "abiertos" ? "solid" : "outline"}
                    >
                      Mis casos abiertos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "biblioteca") {
                          setCaseState("biblioteca");
                        }
                      }}
                      color="primary"
                      fill={caseState === "biblioteca" ? "solid" : "outline"}
                    >
                      Biblioteca de casos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                  <SearchInput
                    onSearch={onSearch}
                    label="Buscar casos"
                    placeholder="Especialidad, diagnóstico, síntomas"
                  />
                  <IonText className={`${styles.caseCount}`}>
                    Casos encontrados: {casesList?.data?.length ?? 0}
                  </IonText>
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={showLoader} />
              <ListaDeCasos
                casos={casesList?.data ?? []}
                tipoCasos={
                  caseState === "mentoreables" ? "abiertos" : caseState
                }
                getCases={() =>
                  queryClient.invalidateQueries({
                    queryKey: getCasesQueryKey,
                  })
                }
              />
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton
                  color="medium"
                  onClick={() => presentFaq()}
                  style={{ marginBottom: 6 }}
                >
                  <IonIcon icon={helpOutline} />
                </IonFabButton>
                <IonFabButton
                  color="primary"
                  routerLink="/casos-clinicos/crear"
                >
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonContent>
          </>
        )}
        {user && user.userType === "specialist" && (
          <>
            <LogoHeader>
              <IonHeader className="header-style ion-no-border">
                <IonTitle className={`${styles.header}`}>
                  Casos Clínicos
                </IonTitle>
                <IonToolbar>
                  <IonButtons class={`${styles.buttons}`}>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "cerrados") {
                          setCaseState("cerrados");
                        }
                      }}
                      color="primary"
                      fill={caseState === "cerrados" ? "solid" : "outline"}
                    >
                      Casos cerrados
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "abiertos") {
                          setCaseState("abiertos");
                        }
                      }}
                      color="primary"
                      fill={caseState === "abiertos" ? "solid" : "outline"}
                    >
                      Casos abiertos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "mentoreables") {
                          setCaseState("mentoreables");
                        }
                      }}
                      color="primary"
                      fill={caseState === "mentoreables" ? "solid" : "outline"}
                    >
                      Casos mentoreables
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      onClick={() => {
                        if (caseState !== "biblioteca") {
                          setCaseState("biblioteca");
                        }
                      }}
                      color="primary"
                      fill={caseState === "biblioteca" ? "solid" : "outline"}
                    >
                      Biblioteca de casos
                    </IonButton>
                    <IonButton
                      className={`${styles.button}`}
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                  <SearchInput
                    onSearch={onSearch}
                    label="Buscar casos"
                    placeholder="Especialidad, diagnóstico, síntomas"
                  />
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={showLoader} />
              <ListaDeCasosEspecialistas
                casos={casesList?.data ?? []}
                tipoCasos={caseState}
                getCases={() =>
                  queryClient.invalidateQueries({
                    queryKey: getCasesQueryKey,
                  })
                }
              />
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton color="medium" onClick={() => presentFaq()}>
                  <IonIcon icon={helpOutline} />
                </IonFabButton>
              </IonFab>
            </IonContent>
          </>
        )}
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicos;
