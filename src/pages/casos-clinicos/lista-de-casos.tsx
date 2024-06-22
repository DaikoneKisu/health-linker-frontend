import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import TarjetaDeCaso from "./tarjeta-de-caso";
import { IonList } from "@ionic/react";

interface Props {
  casos: CasoClinico[];
}

const ListaDeCasos = ({ casos }: Props) => {
  return (
    <IonList>
      {casos.map((c) => (
        <TarjetaDeCaso caso={c} key={c.id} />
      ))}
    </IonList>
  );
};

export default ListaDeCasos;
