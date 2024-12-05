import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import WithAuth from "../../components/WithAuth";
import LogoHeader from "../../components/logo-header/logo-header";
import commonStyles from "../../common.module.css";
import styles from "./recursos.module.css";
import { useResource } from "../../hooks/queries/educational-resources";
import DOMPurify from "dompurify";
interface Props extends RouteComponentProps<{ id: string }> {}

export default function DetalleRecurso({ match }: Props) {
  const resource = useResource(match.params.id);

  // Sanitizar el contenido HTML
  const sanitizedContent = DOMPurify.sanitize(
    resource.data?.data?.content || ""
  );

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${commonStyles.header}`}>
              {resource.data?.data?.title}
            </IonTitle>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading isOpen={resource.isPending && !resource.data} />

          <div className="ion-padding">
            <p className={`${styles.resourceDetailSub}`}>
              Publicado:{" "}
              {new Date(
                String(resource.data?.data?.createdAt)
              ).toLocaleDateString()}
            </p>
            <p className={`${styles.resourceDetailSub}`}>
              Autor:{" "}
              {resource.data?.data?.adminName ??
                resource.data?.data?.specialistName}
            </p>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
