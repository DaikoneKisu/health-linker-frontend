import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  useIonRouter,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import LogoHeader from "../../../components/logo-header/logo-header";
import styles from "./chat-rooms-list.module.css";
import { useRef, useState } from "react";
import { createChatRoom, getChatRooms } from "../../../api/chat-rooms";
import { ChatRoom } from "../../casos-clinicos/types";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { getMe } from "../../../api/auth";
import { chevronForward } from "ionicons/icons";

function ChatRoomsList() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Chat rooms
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const [showToast] = useCommonToast();

  // For creating a room
  const modal = useRef<HTMLIonModalElement>(null);
  const [roomName, setRoomName] = useState("");
  const router = useIonRouter();

  useIonViewWillEnter(() => {
    async function getRooms() {
      const rooms = await getChatRooms();
      if (rooms.success) {
        setChatRooms(rooms.data ?? []);
        setIsLoading(false);
      } else {
        console.error("Error al obtener las salas de chat:", rooms.error);
        showToast("Error al obtener las salas de chat", "error");
      }
    }
    getRooms();
  }, []);

  useIonViewWillEnter(() => {
    getMe().then((data) => {
      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Error:", data.error);
      }
    });
  }, []);

  useIonViewWillLeave(() => {
    setIsLoading(false);
  });

  const onRoomCreate = async () => {
    setIsLoading(true);
    const createdRoom = await createChatRoom(roomName);
    setIsLoading(false);
    if (createdRoom.success) {
      showToast("Sala de chat creada", "success");
      modal.current?.dismiss();
      router.push(`/chat/${createdRoom.data?.id}`);
    } else {
      console.error("Error al crear la sala de chat:", createdRoom.error);
      showToast("Error al crear la sala de chat", "error");
    }
  };

  return (
    <WithAuth>
      <IonPage>
        <LogoHeader>
          <IonHeader className="header-style ion-no-border">
            <IonTitle className={`${styles.header}`}>Salas de Chat</IonTitle>
          </IonHeader>
        </LogoHeader>

        <IonContent>
          <IonLoading isOpen={isLoading} />
          {user && user.userType === "specialist" && (
            <div className={`${styles.emptyMessage} ${styles.createBtn}`}>
              <IonButton onClick={() => modal.current?.present()}>
                Crear sala
              </IonButton>
              {/* Modal to display preview */}
              <IonModal ref={modal}>
                <IonContent className="ion-padding">
                  <h3 id="previewModalHeader">Crear sala de chat</h3>
                  <IonInput
                    type="text"
                    placeholder="Nombre de la sala"
                    label="Introduzca el nombre de la sala"
                    labelPlacement="stacked"
                    onIonInput={(e) => setRoomName(String(e.target.value))}
                  />
                  <IonButton
                    id="previewModalClose"
                    disabled={roomName.trim() === ""}
                    onClick={onRoomCreate}
                  >
                    Guardar
                  </IonButton>
                  <IonButton
                    id="previewModalClose"
                    onClick={() => {
                      modal.current?.dismiss();
                    }}
                    fill="outline"
                  >
                    Cerrar
                  </IonButton>
                </IonContent>
              </IonModal>
            </div>
          )}
          {!!chatRooms.length ? (
            <IonList>
              {chatRooms.map((room) => (
                <IonItem
                  key={room.id}
                  className={`${styles.roomItem}`}
                  onClick={() => router.push(`/chat/${room.id}`)}
                >
                  <div className={`${styles.roomItemContent}`}>
                    <IonLabel>
                      <strong className={`${styles.roomTitle}`}>
                        {room.roomName}
                      </strong>
                    </IonLabel>
                    <IonText className={`${styles.roomSubtext}`}>
                      {room.lastMessageContent}
                    </IonText>
                    <IonText className={`${styles.roomSubtext}`}>
                      {!!room.lastMessageCreated &&
                        new Date(room.lastMessageCreated).toLocaleTimeString()}
                    </IonText>
                  </div>
                  <IonIcon slot="end" icon={chevronForward} />
                </IonItem>
              ))}
            </IonList>
          ) : (
            <div className={`${styles.emptyMessage}`}>
              <IonText>No hay salas abiertas</IonText>
            </div>
          )}
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}

export default ChatRoomsList;
