import { CasoClinico } from "../types";
import { DatosPaciente } from "./información/datos-paciente";
import { FeedbackRender } from "./retroalimentación/retroalimentacion-pacientes";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ id: string }> {
  casoClinico: CasoClinico;
  dentroCaso: (answer: boolean) => void;
}

export const CasoIndividual: React.FC<Props> = ({
  casoClinico,
  dentroCaso,
  match,
}) => {
  const [feedback, setFeedback] = useState(false);

  const isFeedback = (answer: boolean) => {
    setFeedback(answer);
  };

  return (
    <div>
      {feedback ? (
        <FeedbackRender caseId={match.params.id} />
      ) : (
        <DatosPaciente
          casoClinico={casoClinico}
          dentroCaso={dentroCaso}
          isFeedback={isFeedback}
        />
      )}
    </div>
  );
};
