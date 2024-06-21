import axios from "axios";
import { SERVER } from "./server";

const SINGUP = "/auth/signup";

export const registerRuralProffesional = async (
  document: string,
  password: string
) => {
  try {
    const response = await axios.post(`${SERVER}${SINGUP}/rural-professional`, {
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

export const registerSpecialist = async (
  specialtyId: number,
  document: string,
  email: string,
  fullName: string,
  password: string
) => {
  try {
    const response = await axios.post(`${SERVER}${SINGUP}/specialist`, {
      specialtyId,
      document,
      email,
      fullName,
      password,
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

export const getSpecialities = async () => {
  try {
    const response = await axios.get(`${SERVER}/specialties/all`);

    const specialties = response.data;

    return {
      success: true,
      specialties,
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
