import axios from "axios";
import { SERVER } from "./server";
import { CasoClinico } from "../pages/casos-clinicos/types";

export const getCases = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data: casesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const cases: CasoClinico[] = await Promise.all(
      (casesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: cases,
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

export const getCasesCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data: casesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/current-user`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const cases: CasoClinico[] = await Promise.all(
      (casesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: cases,
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

export const getOpenCasesCurrentUser = async (
  page: number = 1,
  size: number = 10
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/current-user?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const openCases: CasoClinico[] = await Promise.all(
      (openCasesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: openCases,
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

export const getClosedCasesCurrentUser = async (
  page: number = 1,
  size: number = 10
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: closedClinicalCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/closed/current-user-record?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const closedClinicalCases: CasoClinico[] = await Promise.all(
      (closedClinicalCasesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: closedClinicalCases,
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

export const getAllClosedCasesCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data: closedClinicalCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/all/closed/current-user-record`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const closedClinicalCases: CasoClinico[] = await Promise.all(
      (closedClinicalCasesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: closedClinicalCases,
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

export const getRequiredCurrentSpecialistCases = async (
  page: number = 1,
  size: number = 10
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: requiredCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/required-current-specialist?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const requiredCases: CasoClinico[] = await Promise.all(
      (requiredCasesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true,
      data: requiredCases,
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

const mapClinicalCaseToCasoClinico = async (c: any): Promise<CasoClinico> => {
  const token = localStorage.getItem("token");
  const { data: specialty } = await axios.get(
    `${SERVER}/specialties/by-id/${c.requiredSpecialtyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return {
    id: c.id,
    fechaNacimiento: c.patientBirthdate,
    genero: c.patientGender === "masculine" ? "masculino" : "femenino",
    especialidadRequerida: specialty.name,
    motivoMentoria: c.movitoMentoria,
    valoracionPaciente: c.patientAssessment,
    descripcionCaso: c.description,
    archivosAsociados: null,
  };
};
