import "./lista-de-casos.css";
import { CasoClinico } from "./types";
import TarjetaDeCasoAbierto from "./tarjetas-de-casos/tarjeta-de-caso-abierto";
import { IonList } from "@ionic/react";
import TarjetaDeCasoCerrado from "./tarjetas-de-casos/tarjeta-de-caso-cerrado";
import TarjetaDeCasoCerradoEspecialista from "./especialistas/tarjeta-de-caso-cerrado-especialista";
import TarjetaDeCasoAbiertoEspecialista from "./especialistas/tarjeta-de-caso-abierto-especialista";
import TarjetaDeCasoMentoreableEspecialista from "./especialistas/tarjeta-de-caso-mentoreable-especialista";

interface Props {
  casos: CasoClinico[];
  cerrado: boolean;
  mentorear: boolean;
  getCases: () => void;
}

const ListaDeCasosEspecialistas = ({
  casos,
  cerrado,
  getCases,
  mentorear,
}: Props) => {
  return (
    <IonList>
      {casos.length === 0 && !mentorear && cerrado && (
        <p style={{ textAlign: "center" }}>No tienes casos cerrados</p>
      )}
      {casos.length === 0 && !mentorear && !cerrado && (
        <p style={{ textAlign: "center" }}>No tienes casos abiertos</p>
      )}
      {casos.length === 0 && mentorear && !cerrado && (
        <p style={{ textAlign: "center" }}>
          No hay casos abiertos que requieran de tu especialidad
        </p>
      )}
      {!mentorear &&
        cerrado &&
        casos.map((c) => (
          <TarjetaDeCasoCerradoEspecialista caso={c} key={c.id} />
        ))}
      {!mentorear &&
        !cerrado &&
        casos.map((c) => (
          <TarjetaDeCasoAbiertoEspecialista
            caso={c}
            key={c.id}
            getCases={getCases}
          />
        ))}
      {mentorear &&
        !cerrado &&
        casos.map((c) => (
          <TarjetaDeCasoMentoreableEspecialista
            caso={c}
            key={c.id}
            getCases={getCases}
          />
        ))}
    </IonList>
  );
};

export default ListaDeCasosEspecialistas;
