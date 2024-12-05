import TarjetaDeCasoAbierto from "../../casos-clinicos/tarjetas-de-casos/tarjeta-de-caso-abierto";
import TarjetaDeCasoCerrado from "../../casos-clinicos/tarjetas-de-casos/tarjeta-de-caso-cerrado";
import { CasoClinico } from "../../casos-clinicos/types";
import "../../casos-clinicos/lista-de-casos.css";
import { IonList } from "@ionic/react";

interface Props {
  casos: CasoClinico[];
  cerrado: boolean;
  getCases: () => void;
}

const ListaDeCasosAdmin = ({ casos, cerrado, getCases }: Props) => {
  return (
    <IonList>
      {casos.length === 0 && cerrado && (
        <p style={{ textAlign: "center" }}>No hay casos cerrados</p>
      )}
      {casos.length === 0 && !cerrado && (
        <p style={{ textAlign: "center" }}>No hay casos abiertos</p>
      )}
      {cerrado
        ? casos.map((c) => (
            <TarjetaDeCasoCerrado
              caso={c}
              key={c.id}
              getCases={getCases}
              isAdmin
            />
          ))
        : casos.map((c) => (
            <TarjetaDeCasoAbierto
              caso={c}
              key={c.id}
              getCases={getCases}
              isAdmin
            />
          ))}
    </IonList>
  );
};

export default ListaDeCasosAdmin;
