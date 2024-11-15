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
  useIonViewWillLeave,
  IonToolbar,
  IonInput,
  useIonRouter,
} from "@ionic/react";
import { add, search } from "ionicons/icons";
import "./styles.css";
import { CasoClinico } from "./types";
import { useState, useEffect } from "react";
import WithAuth from "../../components/WithAuth";
import {
  getClosedCasesCurrentUser,
  getOpenCasesCurrentUser,
  getRequiredCurrentSpecialistCases,
} from "../../api/casos-clinicos";
import ListaDeCasos from "./lista-de-casos";
import LogoHeader from "../../components/logo-header/logo-header";
import styles from "./casos-clinicos.module.css";
import { getMe } from "../../api/auth";
import ListaDeCasosEspecialistas from "./lista-de-casos-especialistas";
import { Field, FieldProps, Form, Formik } from "formik";
import { useAppDispatch } from "../../store/hooks";
import { setAuth } from "../../store/slices/auth";

const CasosClinicos = () => {
  const [casosClinicos, setCasosClinicos] = useState<CasoClinico[]>([]);
  const [dentro, setDentro] = useState(false);
  const [page, setPage] = useState(1);
  const [currentCase, setCurrentCase] = useState<CasoClinico>();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [caseState, setCaseState] = useState<
    "abiertos" | "cerrados" | "mentoreables"
  >("abiertos");

  const dispatch = useAppDispatch();
  const router = useIonRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    router.push("/login");
  };

  const casoEscogido = (caso: CasoClinico) => {
    setCurrentCase(caso);
  };

  const dentroCaso = (answer: boolean) => {
    setDentro(answer);
  };

  const getOpenCases = async (currentSearch?: string) => {
    startLoading();
    const response = await getOpenCasesCurrentUser(page, 100, currentSearch);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const getClosedCases = async (currentSearch?: string) => {
    startLoading();
    const response = await getClosedCasesCurrentUser(page, 100, currentSearch);
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const getRequiredCurrentSpecialist = async (currentSearch?: string) => {
    startLoading();
    const response = await getRequiredCurrentSpecialistCases(
      page,
      100,
      currentSearch
    );
    if (response.success) {
      setCasosClinicos(response.data!);
    } else {
      console.error("Error:", response.error);
    }
    finishLoading();
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "rural professional") {
      if (
        caseState === "cerrados" &&
        !(localStorage.getItem("token") == null)
      ) {
        getClosedCases().then(() => setPageLoaded(true));
      } else {
        getOpenCases().then(() => setPageLoaded(true));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "specialist") {
      if (
        caseState === "cerrados" &&
        !(localStorage.getItem("token") == null)
      ) {
        getClosedCases().then(() => setPageLoaded(true));
      } else if (
        caseState === "abiertos" &&
        !(localStorage.getItem("token") == null)
      ) {
        getOpenCases().then(() => setPageLoaded(true));
      } else if (
        caseState === "mentoreables" &&
        !(localStorage.getItem("token") == null)
      ) {
        getRequiredCurrentSpecialist().then(() => setPageLoaded(true));
      }
    }
  }, [user]);

  useIonViewWillEnter(() => {
    getMe().then((data) => {
      if (data.success) {
        setUser({ ...data.user, role: "regular" });
      } else {
        console.error("Error:", data.error);
      }
    });
  }, []);

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "rural professional") {
      if (pageLoaded && !(localStorage.getItem("token") == null)) {
        if (caseState === "cerrados") {
          getClosedCases();
        } else {
          getOpenCases();
        }
      }
    }
  }, [caseState]);

  useEffect(() => {
    if (user == null) return;
    if (user.userType === "specialist") {
      if (pageLoaded && !(localStorage.getItem("token") == null)) {
        if (
          caseState === "cerrados" &&
          !(localStorage.getItem("token") == null)
        ) {
          getClosedCases();
        } else if (
          caseState === "abiertos" &&
          !(localStorage.getItem("token") == null)
        ) {
          getOpenCases();
        } else if (
          caseState === "mentoreables" &&
          !(localStorage.getItem("token") == null)
        ) {
          getRequiredCurrentSpecialist();
        }
      }
    }
  }, [caseState]);

  useIonViewWillLeave(() => {
    setPageLoaded(false);
  }, []);

  const onSearch = (value: string) => {
    if (caseState === "cerrados") {
      return getClosedCases(value);
    } else if (caseState === "abiertos") {
      return getOpenCases(value);
    } else {
      return getRequiredCurrentSpecialist(value);
    }
  };

  const SearchInput = () => (
    <Formik
      initialValues={{ currentSearch: "" }}
      onSubmit={(values) => {
        onSearch(values.currentSearch);
      }}
    >
      {() => (
        <Form className={`${styles.searchContainer}`}>
          <Field name="currentSearch">
            {({ field }: FieldProps) => (
              <IonInput
                className={`${styles.search}`}
                label="Buscar casos"
                labelPlacement="stacked"
                placeholder="Especialidad, diagnóstico, síntomas"
                fill="outline"
                type="search"
                value={field.value}
                name={field.name}
                onIonBlur={field.onBlur}
                onIonInput={field.onChange}
              >
                <IonIcon slot="start" icon={search} />
              </IonInput>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );

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
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                  <SearchInput />
                  <IonText className={`${styles.caseCount}`}>
                    Casos encontrados: {casosClinicos.length}
                  </IonText>
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={isLoading} />
              <ListaDeCasos
                casos={isLoading ? [] : casosClinicos}
                dentroCaso={dentroCaso}
                casoEscogido={casoEscogido}
                cerrado={caseState === "cerrados"}
                getCases={
                  caseState === "cerrados" ? getClosedCases : getOpenCases
                }
              />
              <IonFab slot="fixed" horizontal="end" vertical="bottom">
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
                      routerLink="/login"
                      onClick={logOut}
                      color="dark"
                      fill="outline"
                    >
                      Cerrar Sesion
                    </IonButton>
                  </IonButtons>
                  <SearchInput />
                </IonToolbar>
              </IonHeader>
            </LogoHeader>
            <IonContent>
              <IonLoading isOpen={isLoading} />
              <ListaDeCasosEspecialistas
                casos={isLoading ? [] : casosClinicos}
                dentroCaso={dentroCaso}
                casoEscogido={casoEscogido}
                cerrado={caseState === "cerrados"}
                getCases={
                  caseState === "cerrados"
                    ? getClosedCases
                    : caseState === "abiertos"
                    ? getOpenCases
                    : caseState === "mentoreables"
                    ? getRequiredCurrentSpecialist
                    : () => {}
                }
                mentorear={caseState === "mentoreables"}
              />
            </IonContent>
          </>
        )}
      </IonPage>
    </WithAuth>
  );
};

export default CasosClinicos;
