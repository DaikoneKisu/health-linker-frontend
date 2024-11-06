import { IonAlert } from "@ionic/react";
import { deleteClinicalCase } from "../../api/casos-clinicos";
import { useCommonToast } from "../../hooks/useCommonToast";

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

  // Use toast for improved ux
  const [showToast] = useCommonToast();

  const deleteCase = async () => {
    await deleteClinicalCase(caseId).then((data) => {
      if (data.success) {
        // alert("Caso eliminado");
        showToast("Caso eliminado", "success");
      } else {
        // alert("Error al intentar eliminar el caso");
        showToast("Error al intentar eliminar el caso", "error");
      }
    });
  };

  return (
    <IonAlert
      header="¿Está seguro?"
      message="Esta acción no se puede deshacer."
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
