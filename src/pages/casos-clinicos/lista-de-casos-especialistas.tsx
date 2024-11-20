import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import { IonList } from "@ionic/react";
import TarjetaDeCasoCerradoEspecialista from "./especialistas/tarjeta-de-caso-cerrado-especialista";
import TarjetaDeCasoAbiertoEspecialista from "./especialistas/tarjeta-de-caso-abierto-especialista";
import TarjetaDeCasoMentoreableEspecialista from "./especialistas/tarjeta-de-caso-mentoreable-especialista";
import TarjetaDeCasoBiblioteca from "./tarjetas-de-casos/tarjeta-de-caso-biblioteca";

interface Props {
  casos: CasoClinico[];
  tipoCasos: "abiertos" | "cerrados" | "mentoreables" | "biblioteca";
  getCases: () => void;
}

const ListaDeCasosEspecialistas = ({ casos, tipoCasos, getCases }: Props) => {
  return (
    <IonList>
      {casos.length === 0 && tipoCasos === "cerrados" && (
        <p style={{ textAlign: "center" }}>No hay casos cerrados</p>
      )}
      {casos.length === 0 && tipoCasos === "abiertos" && (
        <p style={{ textAlign: "center" }}>No hay casos abiertos</p>
      )}
      {casos.length === 0 && tipoCasos === "mentoreables" && (
        <p style={{ textAlign: "center" }}>
          No hay casos abiertos que requieran de tu especialidad
        </p>
      )}
      {casos.length === 0 && tipoCasos === "biblioteca" && (
        <p style={{ textAlign: "center" }}>
          No hay casos en la biblioteca de casos
        </p>
      )}
      {tipoCasos === "cerrados" &&
        casos.map((c) => (
          <TarjetaDeCasoCerradoEspecialista caso={c} key={c.id} />
        ))}
      {tipoCasos === "abiertos" &&
        casos.map((c) => (
          <TarjetaDeCasoAbiertoEspecialista
            caso={c}
            key={c.id}
            getCases={getCases}
          />
        ))}
      {tipoCasos === "mentoreables" &&
        casos.map((c) => (
          <TarjetaDeCasoMentoreableEspecialista
            caso={c}
            key={c.id}
            getCases={getCases}
          />
        ))}
      {tipoCasos === "biblioteca" &&
        casos.map((c) => <TarjetaDeCasoBiblioteca caso={c} key={c.id} />)}
    </IonList>
  );
};

export default ListaDeCasosEspecialistas;
