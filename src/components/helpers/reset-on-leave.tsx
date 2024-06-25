import { useIonViewDidLeave } from "@ionic/react";
import { useFormikContext } from "formik";

//* Este componente se encarga de resetear un formulario de Formik cuando el usuario sale de la página.

const ResetOnLeave = () => {
  const { resetForm } = useFormikContext();

  useIonViewDidLeave(() => {
    resetForm();
  });

  return <></>;
};

export default ResetOnLeave;
