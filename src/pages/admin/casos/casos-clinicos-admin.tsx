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
import { useLogOut } from "../../../hooks/useLogOut";
import {
  useClosedCasesCurrentAdmin,
  useOpenCasesCurrentAdmin,
} from "../../../hooks/queries/clinical-cases";
import { useQueryClient } from "@tanstack/react-query";
import WithAuth from "../../../components/WithAuth";
import ListaDeCasosAdmin from "./ListaDeCasosAdmin";
import { useAppSelector } from "../../../store/hooks";

const CasosClinicosAdmin = () => {
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [caseState, setCaseState] = useState<"abiertos" | "cerrados">(
    "abiertos"
  );

  const userFromStore = useAppSelector((state) => state.user);

  const logOut = useLogOut();

  // Clinical cases queries
  const { data: openCasesData, isLoading: openCasesLoading } =
    useOpenCasesCurrentAdmin({
      page,
      currentSearch,
      email: userFromStore?.email ?? "",
      enabled: true,
    });

  const { data: closedCasesData, isLoading: closedCasesLoading } =
    useClosedCasesCurrentAdmin({
      page,
      currentSearch,
      email: userFromStore?.email ?? "",
      enabled: true,
    });

  const queryClient = useQueryClient();

  const showLoader =
    caseState === "abiertos" ? openCasesLoading : closedCasesLoading;

  const getCasesQueryKey =
    caseState === "abiertos"
      ? (["clinical-cases", "open"] as const)
      : (["clinical-cases", "closed"] as const);

  const casesList = caseState === "abiertos" ? openCasesData : closedCasesData;

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
