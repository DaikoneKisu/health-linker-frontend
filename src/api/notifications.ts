import axios from "axios";
import { SERVER } from "./server";

type NotificationsSpecialist = {
  assignedCasesCount: number;
  messagesCount: number;
};

type NotificationsRural = {
  feedbackCount: number;
  messagesCount: number;
};

type NotificationsAdmin = {
  newCasesCount: number;
};

export async function setLastOnline() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${SERVER}/notifications/last-online`,
      null,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.status === 204) {
      console.log("Last online set successfully");
    } else {
      console.error("Error setting last online: ", response);
    }
  } catch (error) {
    console.error("Error setting last online: ", error);
  }
}

export async function getNotifications(
  userType: "specialist" | "rural professional" | "admin"
) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/notifications`, {
      headers: { Authorization: "Bearer " + token },
    });

    if (response.status === 200) {
      const { data } = response;
      if (userType === "specialist") {
        return data as NotificationsSpecialist;
      } else if (userType === "rural professional") {
        return data as NotificationsRural;
      }
      return data as NotificationsAdmin;
    } else {
      console.error("Error getting notifications: ", response);
      return null;
    }
  } catch (error) {
    console.error("Error getting notifications: ", error);
    return null;
  }
}
