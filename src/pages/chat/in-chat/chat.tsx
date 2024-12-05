import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import WithAuth from "../../../components/WithAuth";
import { RouteComponentProps } from "react-router";
import React, { useId, useRef, useState } from "react";
import { type ChatMessage } from "../../casos-clinicos/types";
import { getInitialChatData } from "../../../api/chat-rooms";
import { useCommonToast } from "../../../hooks/useCommonToast";
import { io, Socket } from "socket.io-client";
import { SERVER } from "../../../api/server";
import styles from "./chat.module.css";
import {
  arrowBack,
  attach,
  imageOutline,
  micOutline,
  send,
} from "ionicons/icons";
import { sendMessage, uploadFile } from "../../../api/chat-messages";
import { useMutation } from "@tanstack/react-query";
import { AudioRecorder } from "react-audio-voice-recorder";

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

  // Socket for connection
  const [socket, setSocket] = useState<Socket | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const adjuntoTriggerId = useId();

  const router = useIonRouter();

  const [showToast] = useCommonToast();

  const contentRef = useRef<HTMLIonContentElement>(null);

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
    getChatData().then(() => contentRef.current?.scrollToBottom(500));
  }, [match.params.id]);

  useIonViewWillEnter(() => {
    function connectToChat() {
      const sock = io(SERVER);

      sock.on(`new-message-${match.params.id}`, (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
        contentRef.current?.scrollToBottom(500);
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
      contentRef.current?.scrollToBottom(500);
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

        <IonContent ref={contentRef}>
          <IonLoading isOpen={isLoading} />

          <MessagesList messages={messages} />

          <FileUploadModal
            triggerId={adjuntoTriggerId}
            roomId={match.params.id}
          />
        </IonContent>

        <IonFooter>
          {/* Message input */}
          <form className={`${styles.inputContainer}`} onSubmit={onSendMessage}>
            <IonInput
              placeholder="Escribe un mensaje..."
              value={currentMessage}
              onIonInput={(e) => setCurrentMessage(String(e.target.value))}
            />
            <IonButton shape="round" type="button" id={adjuntoTriggerId}>
              <IonIcon slot="icon-only" icon={attach} />
            </IonButton>
            <IonButton
              shape="round"
              disabled={!currentMessage.length}
              type="submit"
            >
              <IonIcon slot="icon-only" icon={send} />
            </IonButton>
          </form>
        </IonFooter>
      </IonPage>
    </WithAuth>
  );
}

function MessagesList({ messages }: { messages: ChatMessage[] }) {
  const [image, setImage] = useState("");

  return (
    <>
      {/* Lista de mensajes */}
      <IonList>
        {messages.map((message) => (
          <IonItem key={message.id} className={`${styles.message}`}>
            {message.messageType === "text" && (
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
            )}

            {message.messageType === "image" && (
              <div className={`${styles.messageContent}`}>
                <IonText className={`${styles.messageDetail}`}>
                  {message.senderName}
                </IonText>
                <IonImg
                  src={message.content}
                  alt={`Mensaje de ${message.senderName}`}
                  className={`${styles.chatImage}`}
                  onClick={() => {
                    setImage(message.content);
                  }}
                />
                <IonText
                  className={`${styles.messageDetail} ${styles.messageTime}`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </IonText>
              </div>
            )}

            {message.messageType === "audio" && (
              <div className={`${styles.messageContent}`}>
                <IonText className={`${styles.messageDetail}`}>
                  {message.senderName}
                </IonText>
                <audio src={message.content} controls />
                <IonText
                  className={`${styles.messageDetail} ${styles.messageTime}`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </IonText>
              </div>
            )}
          </IonItem>
        ))}
        {messages.length === 0 && (
          <IonLabel className={`${styles.emptyMessage}`}>
            No hay mensajes en este chat
          </IonLabel>
        )}
      </IonList>

      {/* Vista previa de imágenes */}
      <IonModal isOpen={image !== ""}>
        <IonHeader className="ion-padding">
          <IonToolbar>
            <IonTitle>Vista previa</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setImage("");
                }}
                color="primary"
              >
                Salir
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonImg src={image} alt="Imagen del mensaje" />
        </IonContent>
      </IonModal>
    </>
  );
}

function FileUploadModal({
  triggerId,
  roomId,
}: {
  triggerId: string;
  roomId: string;
}) {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [fileType, setFileType] = useState<"image" | "audio">("image");
  const [uploadFiles, setUploadFiles] = useState<File[] | Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showToast] = useCommonToast();

  const fileUploadMutation = useMutation({
    mutationFn: (files: File[] | Blob[]) => {
      return Promise.all(
        files.map(async (file) => {
          const response = await uploadFile(file);
          if (response.success) {
            return sendMessage(Number(roomId), response.fileName, fileType);
          }
        })
      );
    },
    onSuccess: (data) => {
      if (!data.some((res) => res?.success)) {
        showToast("Ocurrió un error", "error");
      }
      setUploadFiles([]);
      modalRef.current?.dismiss();
    },
  });

  const handleIconClick = () => {
    fileInputRef.current?.click();
    setFileType("image");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadFiles(Array.from(files));
    }
  };
  return (
    <>
      <IonAlert
        isOpen={uploadFiles.length > 0}
        header="Confirmar carga de imagen"
        message="¿Desea subir las imágenes seleccionadas?"
        onDidDismiss={() => setUploadFiles([])}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              setUploadFiles([]);
            },
          },
          {
            text: "Confirmar",
            role: "confirm",
            handler: () => {
              fileUploadMutation.mutate(uploadFiles);
            },
          },
        ]}
      />

      <IonModal
        ref={modalRef}
        trigger={triggerId}
        initialBreakpoint={0.3}
        breakpoints={[0, 0.3, 0.5]}
      >
        <IonHeader className="ion-padding">
          <IonTitle>Selecciona el tipo de multimedia</IonTitle>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList className={`${styles.adjuntoOptionsList}`}>
            <IonItem>
              <form className={`${styles.adjuntoBtnContainer}`}>
                <IonButton type="button" fill="clear" onClick={handleIconClick}>
                  <IonIcon
                    icon={imageOutline}
                    slot="icon-only"
                    className={`${styles.adjuntoIcon}`}
                  />
                </IonButton>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/avif,image/webp"
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <IonText>Imagen</IonText>
              </form>
            </IonItem>

            <IonItem>
              <div className={`${styles.adjuntoBtnContainer}`}>
                <AudioRecorder
                  showVisualizer
                  onRecordingComplete={(blob) => {
                    setFileType("audio");
                    fileUploadMutation.mutate([blob]);
                  }}
                  classes={{
                    AudioRecorderClass: `${styles.audioRecorder}`,
                  }}
                />
                <IonText>Audio</IonText>
              </div>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
}

export default Chat;
