import axios from "axios";
import { SERVER } from "./server";

const SINGUP = "/auth/signup";

export const registerRuralProfessional = async (
  zone: string,
  document: string,
  email: string,
  fullName: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const response = await axios.post(`${SERVER}${SINGUP}/rural-professional`, {
      document,
      password,
      email,
      fullName,
      zone,
      phoneNumber: "593" + phoneNumber,
      isVerified: true,
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
  password: string,
  phoneNumber: string
) => {
  try {
    const response = await axios.post(`${SERVER}${SINGUP}/specialist`, {
      specialtyId,
      document,
      email,
      fullName,
      password,
      phoneNumber: "593" + phoneNumber,
      isVerified: true
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

    const specialties = response.data as { name: string }[];

    return {
      success: true as const,
      specialties,
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
};
