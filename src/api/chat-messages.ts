import axios from "axios";
import { SERVER } from "./server";
import { ChatMessage } from "../pages/casos-clinicos/types";

export async function getPaginatedChatMessages(
  page = 1,
  size = 20,
  roomId: number
) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${SERVER}/chat-messages?page=${page}&size=${size}&roomId=${roomId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const messages = data as ChatMessage[];

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error,
      };
    } else {
      console.error("Error obteniendo mensajes de chat:", error);
      return { success: false, error: "Error obteniendo mensajes de chat" };
    }
  }
}

export async function sendMessage(
  roomId: number,
  content: string,
  messageType: "text" | "image" | "audio"
) {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${SERVER}/chat-messages`,
      {
        roomId,
        content,
        messageType,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error,
      };
    } else {
      console.error("Error enviando mensaje:", error);
      return { success: false, error: "Error enviando mensaje" };
    }
  }
}
