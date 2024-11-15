import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import CasosClinicos from "./pages/casos-clinicos/casos-clinicos";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard";
import Foros from "./pages/foros/foros";
import ForoX from "./pages/foros/foroX";
import Registro from "./pages/registro/registro";
import RegistroProfesionalRural from "./pages/registro/profesional-rural/profesional-rural";
import RegistroEspecialista from "./pages/registro/especialista/especialista";
import NotFound from "./pages/not-found";
import CrearCasoClinico from "./pages/casos-clinicos/crear/crear-caso-clinico";
import EditarCasoClinico from "./pages/casos-clinicos/editar/editar-caso-clinico";
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

setupIonicReact({ mode: "md" });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/casos-clinicos" component={CasosClinicos} exact={true} />
        <Route
          path="/casos-clinicos/crear"
          component={CrearCasoClinico}
          exact={true}
        />
        <Route
          path="/casos-clinicos/caso-clinico/:id"
          component={CasoClinico}
        />
        <Route
          path="/casos-clinicos/caso-clinico/editar/:id"
          component={EditarCasoClinico}
        />

        <Route
          path="/casos-clinicos/retroalimentaciones/caso-clinico/:id"
          component={FeedbackRender}
        />
        <Route
          path="/casos-clinicos/retroalimentaciones/cerrado/caso-clinico/:id"
          component={ClosedFeedbackRender}
        />
        <Route path="/dashboard" component={Dashboard} exact={true} />
        <Route path="/foros" component={Foros} exact={true} />
        <Route path="/foro-x" component={ForoX} exact={true} />
        <Route path="/registro" component={Registro} exact={true} />
        <Route
          path="/registro/especialista"
          component={RegistroEspecialista}
          exact={true}
        />
        <Route
          path="/registro/profesional-rural"
          component={RegistroProfesionalRural}
          exact={true}
        />
        <Route
          path="/"
          render={() => <Redirect to="/login" />} //hacer un if de si no está logeado y uno que lleva a homepage si lo está
          exact={true}
        />
        <Route component={NotFound} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
