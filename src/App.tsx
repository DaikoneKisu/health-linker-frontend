import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import CasosClinicos from "./pages/casos-clinicos/casos-clinicos";
import Login from "./pages/login/login";
// import Dashboard from "./pages/dashboard";
// import Foros from "./pages/foros/foros";
// import ForoX from "./pages/foros/foroX";
import Registro from "./pages/registro/registro";
import RegistroProfesionalRural from "./pages/registro/profesional-rural/profesional-rural";
import RegistroEspecialista from "./pages/registro/especialista/especialista";
import NotFound from "./pages/not-found";
import CrearCasoClinico from "./pages/casos-clinicos/crear/crear-caso-clinico";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CasoClinico from "./pages/casos-clinicos/caso-clinico/caso-clinico";
import { FeedbackRender } from "./pages/casos-clinicos/tarjetas-de-casos/retroalimentación/retroalimentacion-pacientes";
import { ClosedFeedbackRender } from "./pages/casos-clinicos/tarjetas-de-casos/retroalimentación/retroalimentafion-pacientes-cerrada";
import { chatbox, documentText, flask, person } from "ionicons/icons";
import { useAppSelector } from "./store/hooks";
import ChatRoomsList from "./pages/chat/chat-rooms/chat-rooms-list";
import Chat from "./pages/chat/in-chat/chat";
import AdminLogin from "./pages/admin/login/admin-login";
import AdminEspecialidades from "./pages/admin/especialidades/especialidades";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminUsuarios } from "./pages/admin/usuarios/usuarios";

setupIonicReact({ mode: "md" });

/**
 * Tabs when logged in
 */
function MainTabs() {
  return (
    <IonTabs>
      {/* Route definition */}
      <IonRouterOutlet>
        <Redirect exact path="/" to="/casos-clinicos" />
        <Redirect exact path="/login" to="/casos-clinicos" />
        <Route path="/casos-clinicos" component={CasosClinicos} exact />
        <Route
          path="/casos-clinicos/crear"
          component={CrearCasoClinico}
          exact
        />
        <Route
          path="/casos-clinicos/caso-clinico/:id"
          component={CasoClinico}
        />
        <Route
          path="/casos-clinicos/retroalimentaciones/caso-clinico/:id"
          component={FeedbackRender}
        />
        <Route
          path="/casos-clinicos/retroalimentaciones/cerrado/caso-clinico/:id"
          component={ClosedFeedbackRender}
        />
        <Route path="/chat" exact component={ChatRoomsList} />
        <Route path="/chat/:id" component={Chat} />
        <Route component={NotFound} />
      </IonRouterOutlet>

      {/* Tabs */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="casos-clinicos" href="/casos-clinicos">
          <IonIcon icon={documentText} />
          <IonLabel>Casos Clínicos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chat" href="/chat">
          <IonIcon icon={chatbox} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

/**
 * Tabs when logged in as admin
 */
function AdminTabs() {
  return (
    <IonTabs>
      {/* Route definition */}
      <IonRouterOutlet>
        <Redirect exact path="/" to="/usuarios" />
        <Redirect exact path="/admin" to="/usuarios" />
        <Route exact path="/usuarios" component={AdminUsuarios} />
        <Route exact path="/especialidades" component={AdminEspecialidades} />
        <Route path="/chat" exact component={ChatRoomsList} />
        <Route path="/chat/:id" component={Chat} />
        <Route component={NotFound} />
      </IonRouterOutlet>

      {/* Tabs */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="users" href="/usuarios">
          <IonIcon icon={person} />
          <IonLabel>Usuarios</IonLabel>
        </IonTabButton>
        <IonTabButton tab="especialidades" href="/especialidades">
          <IonIcon icon={flask} />
          <IonLabel>Especialidades</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chat" href="/chat">
          <IonIcon icon={chatbox} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

function NavTabs() {
  const user = useAppSelector((state) => state.user);
  if (user.role === "regular") {
    return <MainTabs />;
  }
  return <AdminTabs />;
}

const queryClient = new QueryClient();

const App = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          {auth.auth ? (
            <NavTabs />
          ) : (
            <IonRouterOutlet>
              <Route path="/login" component={Login} exact />
              <Route path="/registro" component={Registro} exact />
              <Route
                path="/registro/especialista"
                component={RegistroEspecialista}
                exact
              />
              <Route
                path="/registro/profesional-rural"
                component={RegistroProfesionalRural}
                exact
              />
              <Route
                path="/admin"
                exact
                component={auth.auth ? NavTabs : AdminLogin}
              />
              <Route path="/" exact component={auth.auth ? NavTabs : Login} />
              <Route component={NotFound} />
            </IonRouterOutlet>
          )}
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
