import axios from "axios";
import { SERVER } from "./server";
import {
  ChatMessage,
  ChatRoom,
  ChatRoomCreated,
} from "../pages/casos-clinicos/types";
import { getPaginatedChatMessages } from "./chat-messages";

/**
 * Get list of available chat rooms
 */
export async function getChatRooms() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${SERVER}/chat-rooms`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const rooms = data as ChatRoom[];

    return {
      success: true,
      data: rooms,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error,
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false, error: "Error inesperado" };
    }
  }
}

export async function getInitialChatData(id: string) {
  try {
    const token = localStorage.getItem("token");
    const chatDataPromise = axios.get(`${SERVER}/chat-rooms/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const messagesPromise = getPaginatedChatMessages(1, 20, parseInt(id));

    const [chatDataResponse, messagesResponse] = await Promise.all([
      chatDataPromise,
      messagesPromise,
    ]);

    const chatData = chatDataResponse.data as ChatRoomCreated;
    const messages = messagesResponse.data as ChatMessage[];

    return {
      success: true,
      data: {
        chatData,
        messages,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: "Error obteniendo la sala de chat",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false, error: "Error obteniendo la sala de chat" };
    }
  }
}

/**
 * Create a new chat room
 * @param roomName
 */
export async function createChatRoom(roomName: string) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${SERVER}/chat-rooms`,
      {
        roomName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const createdRoom = data as ChatRoomCreated;

    return {
      success: true,
      data: createdRoom,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: "Error creando la sala de chat",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false, error: "Error creando la sala de chat" };
    }
  }
}
