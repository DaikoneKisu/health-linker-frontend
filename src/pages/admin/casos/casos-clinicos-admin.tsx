import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonButton,
  IonText,
  IonLoading,
  IonToolbar,
} from "@ionic/react";
import "../../casos-clinicos/styles.css";
import { useState } from "react";
import LogoHeader from "../../../components/logo-header/logo-header";
import styles from "../../casos-clinicos/casos-clinicos.module.css";
import SearchInput from "../../../components/SearchInput";
import { useLogOut } from "../../../store/local-storage";
import {
  useClosedCasesCurrentAdmin,
  useMentoredCasesAdmin,
  useNotMentoredCasesAdmin,
  useOpenCasesCurrentAdmin,
} from "../../../hooks/queries/clinical-cases";
import { useQueryClient } from "@tanstack/react-query";
import WithAuth from "../../../components/WithAuth";
import ListaDeCasosAdmin from "./ListaDeCasosAdmin";
import { useAppSelector } from "../../../store/hooks";

const CasosClinicosAdmin = () => {
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [caseState, setCaseState] = useState<
    "asignados" | "cerrados" | "sin-asignar"
  >("sin-asignar");

  const userFromStore = useAppSelector((state) => state.user);

  const logOut = useLogOut();

  // Clinical cases queries
  const { data: assignedCasesData, isLoading: assignedCasesLoading } =
    useMentoredCasesAdmin({
      page,
      currentSearch,
      enabled: caseState === "asignados",
    });

  const { data: notAssignedCasesData, isLoading: notAssignedCasesLoading } =
    useNotMentoredCasesAdmin({
      page,
      currentSearch,
      enabled: caseState === "sin-asignar",
    });

  const { data: closedCasesData, isLoading: closedCasesLoading } =
    useClosedCasesCurrentAdmin({
      page,
      currentSearch,
      email: userFromStore?.email ?? "",
      enabled: caseState === "cerrados",
    });

  const queryClient = useQueryClient();

  const showLoader =
    caseState === "sin-asignar"
      ? notAssignedCasesLoading
      : caseState === "asignados"
      ? assignedCasesLoading
      : closedCasesLoading;

  const getCasesQueryKey =
    caseState === "asignados"
      ? (["clinical-cases", "assigned"] as const)
      : caseState === "sin-asignar"
      ? (["clinical-cases", "not-assigned"] as const)
      : (["clinical-cases", "closed"] as const);

  const casesList =
    caseState === "sin-asignar"
      ? notAssignedCasesData
      : caseState === "asignados"
      ? assignedCasesData
      : closedCasesData;

  const onSearch = (value: string) => {
    setCurrentSearch(value);
  };

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${styles.header}`}>Casos Clínicos</IonTitle>
            <IonToolbar>
              <IonButtons class={`${styles.buttons}`}>
                <IonButton
                  className={`${styles.button}`}
                  onClick={() => {
                    if (caseState !== "sin-asignar") {
                      setCaseState("sin-asignar");
                    }
                  }}
                  color="primary"
                  fill={caseState === "sin-asignar" ? "solid" : "outline"}
                >
                  Casos sin asignar
                </IonButton>
                <IonButton
                  className={`${styles.button}`}
                  color="primary"
                  onClick={() => {
                    if (caseState !== "asignados") {
                      setCaseState("asignados");
                    }
                  }}
                  fill={caseState === "asignados" ? "solid" : "outline"}
                >
                  Casos asignados
                </IonButton>
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
                  routerLink="/admin"
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
          <ListaDeCasosAdmin
            casos={casesList?.data ?? []}
            cerrado={caseState === "cerrados"}
            getCases={() =>
              queryClient.invalidateQueries({
                queryKey: getCasesQueryKey,
              })
            }
          />
        </IonContent>
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicosAdmin;
