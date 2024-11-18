import axios from "axios";
import { SERVER } from "./server";
import { EducationalResource } from "../pages/casos-clinicos/types";

export async function getResources(query: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${SERVER}/educational-resources/all?query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as EducationalResource[];

    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Error obteniendo recursos",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Error obteniendo recursos" };
    }
  }
}

export async function getResource(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/educational-resources/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.data as EducationalResource;

    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Error obteniendo recurso",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Error obteniendo recurso" };
    }
  }
}

export async function createResource({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${SERVER}/educational-resources/`,
      { title, content },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as EducationalResource;

    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Ocurrió un error",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Ocurrió un error" };
    }
  }
}
