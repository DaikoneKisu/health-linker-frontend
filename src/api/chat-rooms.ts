import axios from "axios";
import { SERVER } from "./server";
import { ChatRoom, ChatRoomCreated } from "../pages/casos-clinicos/types";

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
