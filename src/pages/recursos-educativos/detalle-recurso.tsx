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

interface Props extends RouteComponentProps<{ id: string }> {}

export default function DetalleRecurso({ match }: Props) {
  const resource = useResource(match.params.id);

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
          <IonLoading isOpen={resource.isLoading} />

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
            <p>{resource.data?.data?.content}</p>
          </div>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}
