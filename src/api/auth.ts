import axios from "axios";
import { SERVER } from "./server";

export const signin = async (document: string, password: string) => {
  try {
    const response = await axios.post(`${SERVER}/auth/signin`, {
      document,
      password,
    });

    const token = response.data;

    return {
      success: true,
      token,
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
};

export const signupSpecialist = async (
  document: string,
  password: string,
  email: string,
  fullName: string,
  specialtyId: number
) => {
  try {
    const response = await axios.post(`${SERVER}/users/specialist`, {
      document,
      password,
      email,
      fullName,
      specialtyId,
    });

    return {
      success: true,
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
};

export const signupRuralProfessional = async (
  document: string,
  password: string,
  email: string,
  fullName: string,
  zone: string
) => {
  try {
    const response = await axios.post(`${SERVER}/users/specialist`, {
      document,
      password,
      email,
      fullName,
      zone,
    });

    return {
      success: true,
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
};

export const getOneUser = async (document: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/users/${document}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const user = response.data;

    return {
      success: true,
      user,
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
};

export const getMe = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/users/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const user = response.data;

    return {
      success: true,
      user,
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
};
