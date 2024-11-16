import axios from "axios";
import { SERVER } from "./server";

export async function adminSignIn(email: string, password: string) {
  try {
    const response = await axios.post(`${SERVER}/admins/signin`, {
      email,
      password,
    });

    const data = response.data as { token: string; fullName: string };

    return {
      success: true as const,
      token: data.token,
      fullName: data.fullName,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: error,
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Error inesperado" };
    }
  }
}

export async function addSpeciality(name: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${SERVER}/specialties`,
      {
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data;
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: error,
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Error inesperado" };
    }
  }
}
