import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import { RouteComponentProps } from "react-router";
import React, { useState } from "react";
import { type ChatMessage } from "../../casos-clinicos/types";
import { getInitialChatData } from "../../../api/chat-rooms";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { io, Socket } from "socket.io-client";
import { SERVER } from "../../../api/server";
import styles from "./chat.module.css";
import { arrowBack, send } from "ionicons/icons";
import { sendMessage } from "../../../api/chat-messages";

interface ChatPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

function Chat({ match }: ChatPageProps) {
  // Displayed state
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Message to send
  const [currentMessage, setCurrentMessage] = useState("");

  // Socket for conntection
  const [socket, setSocket] = useState<Socket | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const router = useIonRouter();

  const [showToast] = useCommonToast();

  useIonViewWillEnter(() => {
    async function getChatData() {
      const chatData = await getInitialChatData(match.params.id);
      if (!chatData.success) {
        showToast("Error obteniendo sala de chat", "error");
      } else {
        setChatName(chatData.data?.chatData.roomName ?? "");
        setMessages(chatData.data?.messages ?? []);
        setIsLoading(false);
      }
    }
    getChatData();
  }, [match.params.id]);

  useIonViewWillEnter(() => {
    function connectToChat() {
      const sock = io(SERVER);

      sock.on(`new-message-${match.params.id}`, (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      setSocket(sock);
    }
    connectToChat();
  }, [match.params.id]);

  async function onSendMessage(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const result = await sendMessage(
      Number(match.params.id),
      currentMessage,
      "text"
    );
    setIsLoading(false);
    if (result.success) {
      setCurrentMessage("");
    } else {
      showToast(String(result.error), "error");
    }
  }

  return (
    <WithAuth>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                fill="clear"
                onClick={() => {
                  router.canGoBack() ? router.goBack() : router.push("/chat");
                }}
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>{chatName}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonLoading isOpen={isLoading} />
          {/* Chat messages */}
          <IonList>
            {messages.map((message) => (
              <IonItem key={message.id} className={`${styles.message}`}>
                <div className={`${styles.messageContent}`}>
                  <IonText className={`${styles.messageDetail}`}>
                    {message.senderName}
                  </IonText>
                  <IonText>{message.content}</IonText>
                  <IonText
                    className={`${styles.messageDetail} ${styles.messageTime}`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </IonText>
                </div>
              </IonItem>
            ))}
            {messages.length === 0 && (
              <IonLabel className={`${styles.emptyMessage}`}>
                No hay mensajes en este chat
              </IonLabel>
            )}
          </IonList>

          {/* Message input */}
          <form className={`${styles.inputContainer}`} onSubmit={onSendMessage}>
            <IonInput
              placeholder="Escribe un mensaje..."
              value={currentMessage}
              onIonInput={(e) => setCurrentMessage(String(e.target.value))}
            />
            <IonButton
              shape="round"
              disabled={!currentMessage.length}
              type="submit"
            >
              <IonIcon slot="icon-only" icon={send} />
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    </WithAuth>
  );
}

export default Chat;
