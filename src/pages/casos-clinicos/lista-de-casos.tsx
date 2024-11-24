import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import TarjetaDeCasoAbierto from "./tarjetas-de-casos/tarjeta-de-caso-abierto";
import { IonList } from "@ionic/react";
import TarjetaDeCasoCerrado from "./tarjetas-de-casos/tarjeta-de-caso-cerrado";
import TarjetaDeCasoBiblioteca from "./tarjetas-de-casos/tarjeta-de-caso-biblioteca";

interface Props {
  casos: CasoClinico[];
  tipoCasos: "abiertos" | "cerrados" | "biblioteca";
  getCases: () => void;
}

const ListaDeCasos = ({ casos, tipoCasos, getCases }: Props) => {
  return (
    <IonList>
      {casos.length === 0 && tipoCasos === "cerrados" && (
        <p style={{ textAlign: "center" }}>No has cerrado casos todavía</p>
      )}
      {casos.length === 0 && tipoCasos === "abiertos" && (
        <p style={{ textAlign: "center" }}>No has abierto casos todavía</p>
      )}
      {casos.length === 0 && tipoCasos === "biblioteca" && (
        <p style={{ textAlign: "center" }}>No hay casos en la biblioteca</p>
      )}
      {tipoCasos === "cerrados" &&
        casos.map((c) => (
          <TarjetaDeCasoCerrado caso={c} getCases={getCases} key={c.id} />
        ))}
      {tipoCasos === "abiertos" &&
        casos.map((c) => (
          <TarjetaDeCasoAbierto caso={c} getCases={getCases} key={c.id} />
        ))}
      {tipoCasos === "biblioteca" &&
        casos.map((c) => <TarjetaDeCasoBiblioteca caso={c} key={c.id} />)}
    </IonList>
  );
};

export default ListaDeCasos;
