import { PropsWithChildren } from "react";
import { IonHeader, IonImg } from "@ionic/react";
import styles from "./logo-header.module.css";

type Props = {
  primary?: boolean;
} & PropsWithChildren;

const LogoHeader = ({ children, primary }: Props) => (
  <IonHeader
    className={`${
      primary ? styles.primaryBgColor : styles.lightBgColor
    } ion-padding-vertical  ion-no-border`}
  >
    <div className={styles.headerImgContainer}>
      <IonImg
        src={primary ? "/header-white.png" : "/header-black.png"}
        alt="Healthlinker logo"
        className={styles.headerImg}
      />
    </div>
    {children}
  </IonHeader>
);

export default LogoHeader;
