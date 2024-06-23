import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import TarjetaDeCaso from "./tarjeta-de-caso";
import { IonList } from "@ionic/react";

interface Props {
  casos: CasoClinico[];
  dentroCaso: (answer: boolean) => void;
  casoEscogido: (caso: CasoClinico) => void;
}

const ListaDeCasos = ({ casos, dentroCaso, casoEscogido }: Props) => {
  return (
    <IonList>
      {casos.map((c) => (
        <TarjetaDeCaso
          caso={c}
          dentroCaso={dentroCaso}
          casoEscogido={casoEscogido}
          key={c.id}
        />
      ))}
    </IonList>
  );
};

export default ListaDeCasos;
