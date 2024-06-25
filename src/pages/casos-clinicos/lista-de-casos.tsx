import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import TarjetaDeCasoAbierto from "./tarjetas-de-casos/tarjeta-de-caso-abierto";
import { IonList } from "@ionic/react";
import TarjetaDeCasoCerrado from "./tarjetas-de-casos/tarjeta-de-caso-cerrado";

interface Props {
  casos: CasoClinico[];
  dentroCaso: (answer: boolean) => void;
  casoEscogido: (caso: CasoClinico) => void;
  cerrado: boolean;
  getCases: () => void;
}

const ListaDeCasos = ({
  casos,
  dentroCaso,
  casoEscogido,
  cerrado,
  getCases,
}: Props) => {
  return (
    <IonList>
      {casos.length === 0 && cerrado && (
        <p style={{ textAlign: "center" }}>No has cerrado casos todavía</p>
      )}
      {casos.length === 0 && !cerrado && (
        <p style={{ textAlign: "center" }}>No has abierto casos todavía</p>
      )}
      {cerrado
        ? casos.map((c) => (
            <TarjetaDeCasoCerrado
              caso={c}
              dentroCaso={dentroCaso}
              casoEscogido={casoEscogido}
              key={c.id}
              getCases={getCases}
            />
          ))
        : casos.map((c) => (
            <TarjetaDeCasoAbierto
              caso={c}
              dentroCaso={dentroCaso}
              casoEscogido={casoEscogido}
              key={c.id}
              getCases={getCases}
            />
          ))}
    </IonList>
  );
};

export default ListaDeCasos;
