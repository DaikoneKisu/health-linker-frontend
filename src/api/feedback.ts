import axios from "axios";
import { SERVER } from "./server";
import { Feedback } from "../pages/casos-clinicos/types";
import moment from "moment";

const CLINICALFEEDBACK_URL = "clinical-cases-feedbacks/by-clinical-case/";

export const getCaseFeedback = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const { data: feedbacksFromBackend } = await axios.get(
      `${SERVER}/${CLINICALFEEDBACK_URL}/${id}`,
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
    fecha: moment(c.createdAt).format("YYYY-MM-DD"),
    hora: moment(c.createdAt).format("HH:mm:ss"),
    texto: c.text,
    autor: user.fullName,
  };
};

/*  id: number;
  fecha: string;
  texto: string;
  autor: string;*/
