import { IonButton, IonItem, IonLabel } from "@ionic/react"

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];

interface Props {
  fileName: string;
  fileExtension: string;
  onClickPreview: () => void;
}

/**
 * Item to display a file in a case file
 */
const CaseFileItem = ({ fileName, fileExtension, onClickPreview }: Props) => {
  const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
  return (
    <IonItem>
      <IonLabel>{fileName}</IonLabel>
      {isImage && <IonButton onClick={onClickPreview}>Ver imagen</IonButton>}
      {!isImage && <IonLabel>Sin vista previa</IonLabel>}
    </IonItem>
  )
}

export default CaseFileItem;
