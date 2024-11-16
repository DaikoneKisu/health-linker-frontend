import axios from "axios";
import { SERVER } from "./server";
import { RuralProfessionalsAdmin, SpecialistAdmin, User } from "../pages/casos-clinicos/types";

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

export async function getSpecialistsAdmin(query: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${SERVER}/specialists/all/admin?query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as SpecialistAdmin[];
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

export async function getRuralsAdmin(query: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${SERVER}/rural-professionals/all/admin?query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as RuralProfessionalsAdmin[];
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

