import axios from "axios";
import { SERVER } from "./server";
import { Feedback } from "../pages/casos-clinicos/types";
import { DateTime } from "luxon";

const CLINICALFEEDBACK_URL = "clinical-cases-feedbacks";

export const getCaseFeedback = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const { data: feedbacksFromBackend } = await axios.get(
      `${SERVER}/${CLINICALFEEDBACK_URL}/by-clinical-case/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const feedback: Feedback[] = await Promise.all(
      (feedbacksFromBackend as Array<any>).map(
        async (c) => await mapFeedbackArray(c)
      )
    );

    return {
      success: true,
      data: feedback,
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

const mapFeedbackArray = async (c: any): Promise<Feedback> => {
  const token = localStorage.getItem("token");
  const { data: user } = await axios.get(`${SERVER}/users/${c.userDocument}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return {
    id: c.id,
    fecha: DateTime.fromISO(c.createdAt).toFormat("yyyy/MM/DD"),
    hora: DateTime.fromISO(c.createdAt).toFormat("HH:mm"),
    texto: c.text,
    autor: user.fullName,
  };
};

export const submitFeedback = async (text: string, caseId: number) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await axios.post(
      `${SERVER}/${CLINICALFEEDBACK_URL}`,
      { clinicalCaseId: caseId, text: text },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { success: true, data: respuesta };
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
