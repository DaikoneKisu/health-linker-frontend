import { IonAlert } from "@ionic/react";
import { deleteClinicalCase } from "../../api/casos-clinicos";

interface Props {
  caseId: number;
  afterDelete?: () => void;
  triggerElementId: string;
}

const ConfirmCaseDelete = ({
  caseId,
  afterDelete,
  triggerElementId,
}: Props) => {
  const deleteCase = async () => {
    await deleteClinicalCase(caseId).then((data) => {
      if (data.success) {
        alert("Caso eliminado");
      } else {
        alert("Error al intentar eliminar el caso");
      }
    });
  };

  return (
    <IonAlert
      header="Eliminar caso clínico"
      trigger={triggerElementId}
      buttons={[
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          role: "destructive",
          handler: () => {
            deleteCase().then(afterDelete);
          },
        },
      ]}
    />
  );
};

export default ConfirmCaseDelete;
