import axios from "axios";
import { SERVER } from "./server";
import {
  CasoClinico,
  CrearCasoClinico,
  EditCasoClinico,
} from "../pages/casos-clinicos/types";

export const getCase = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const { data: caseFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const clinicalCase: CasoClinico = await mapClinicalCaseToCasoClinico(
      caseFromBackend
    );

    return {
      success: true as const,
      data: clinicalCase,
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
  size: number = 100,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/current-user?page=${page}&size=${size}&query=${query}`,
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

export const getOpenCasesCurrentAdmin = async (
  page: number = 1,
  size: number = 100,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/current-admin?page=${page}&size=${size}&query=${query}`,
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
  size: number = 10,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: closedClinicalCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/closed/current-user-record?page=${page}&size=${size}&query=${query}`,
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

export const getClosedCasesCurrentAdmin = async (
  page: number = 1,
  size: number = 100,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/closed/current-admin?page=${page}&size=${size}&query=${query}`,
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

export const getNotMentoredCasesAdmin = async (
  page: number = 1,
  size: number = 100,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/not-mentored/current-admin?page=${page}&size=${size}&query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const openCases = await Promise.all(
      (openCasesFromBackend as Array<any>).map(async (c) => ({
        ...(await mapClinicalCaseToCasoClinico(c)),
        assigned: false as const,
        specialityId: Number(c.requiredSpecialtyId),
      }))
    );

    return {
      success: true as const,
      data: openCases,
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

export const getMentoredCasesAdmin = async (
  page: number = 1,
  size: number = 100,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/mentored/current-admin?page=${page}&size=${size}&query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const openCases = await Promise.all(
      (openCasesFromBackend as Array<any>).map(async (c) => ({
        ...(await mapClinicalCaseToCasoClinico(c)),
        assigned: true as const,
        specialityId: Number(c.requiredSpecialtyId),
      }))
    );

    return {
      success: true as const,
      data: openCases,
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
  size: number = 99999,
  query = ""
) => {
  try {
    const token = localStorage.getItem("token");
    const { data: requiredCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/required-current-specialist?page=${page}&size=${size}&query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const { data: openCasesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/open/current-user?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const requiredCasesWithoutOpenOnes = (
      requiredCasesFromBackend as Array<ClinicalCaseResponse>
    ).filter(
      (r) =>
        !(openCasesFromBackend as Array<ClinicalCaseResponse>).some(
          (o) => o.id === r.id
        )
    );

    const requiredCases: CasoClinico[] = await Promise.all(
      (requiredCasesWithoutOpenOnes as Array<ClinicalCaseResponse>).map(
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

export async function getCasesLibrary(page = 1, size = 100, query = "") {
  try {
    const token = localStorage.getItem("token");
    const { data: casesFromBackend } = await axios.get(
      `${SERVER}/clinical-cases/library?page=${page}&size=${size}&query=${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const libraryCases = await Promise.all(
      (casesFromBackend as Array<any>).map(
        async (c) => await mapClinicalCaseToCasoClinico(c)
      )
    );

    return {
      success: true as const,
      data: libraryCases,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: error,
      };
    } else {
      console.error("Error obteniendo casos:", error);
      return { success: false as const, error: "Error obteniendo casos" };
    }
  }
}

export const createClinicalCase = async (caso: CrearCasoClinico) => {
  try {
    const token = localStorage.getItem("token");

    const { data: createdCase } = await axios.post<ClinicalCaseResponse>(
      `${SERVER}/clinical-cases`,
      {
        description: caso.descripcionCaso,
        reason: caso.motivoMentoria,
        patientBirthdate: caso.fechaNacimiento,
        patientGender: caso.genero === "masculino" ? "masculine" : "feminine",
        patientReason: caso.motivoPaciente,
        patientAssessment: caso.valoracionPaciente,
        requiredSpecialtyId: caso.especialidadRequerida,
      } satisfies ClinicalCasePost,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!(caso.archivosAsociados == null)) {
      await Promise.all(
        caso.archivosAsociados.map(async (archivo) => {
          const form = new FormData();
          form.append("clinicalCaseId", createdCase.id.toString());
          form.append("file", archivo);

          await axios.post(`${SERVER}/clinical-cases-files`, form, {
            headers: { Authorization: "Bearer " + token },
          });
        })
      );
    }

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

export const updateClinicalCase = async (caso: EditCasoClinico) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      `${SERVER}/clinical-cases/${caso.id}`,
      {
        id: caso.id,
        description: caso.descripcionCaso,
        reason: caso.motivoMentoria,
        patientBirthdate: caso.fechaNacimiento,
        patientGender: caso.genero === "masculino" ? "masculine" : "feminine",
        patientReason: caso.motivoPaciente,
        patientAssessment: caso.valoracionPaciente,
        requiredSpecialtyId: caso.especialidadRequerida,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!(caso.archivosAsociados == null)) {
      await Promise.all(
        caso.archivosAsociados.map(async (archivo) => {
          const form = new FormData();
          form.append("clinicalCaseId", caso.id.toString());
          form.append("file", archivo);

          await axios.post(`${SERVER}/clinical-cases-files`, form, {
            headers: { Authorization: "Bearer " + token },
          });
        })
      );
    }

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
//en vez de borrar marca la etiqueta fechaBorrado con la fecha actual
export const deleteClinicalCase = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticación no encontrado");
    }

    const { data: feedbacks } = await axios.get(
      `${SERVER}/clinical-cases-feedbacks/by-clinical-case/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (feedbacks.length > 0) {
      throw new Error(
        "No se puede eliminar un caso clínico con retroalimentaciones"
      );
    }

    await axios.delete(`${SERVER}/clinical-cases/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export const deleteClinicalCaseFile = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${SERVER}/clinical-cases-files/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export const publicizeClinicalCase = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(`${SERVER}/clinical-cases/publicize/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export const closeClinicalCase = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(`${SERVER}/clinical-cases/close/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export const reopenClinicalCase = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(`${SERVER}/clinical-cases/reopen/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export const assignCase = async ({
  id,
  specialistDocument,
}: {
  id: number;
  specialistDocument: string;
}) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `${SERVER}/clinical-cases/mentor/${id}`,
      { specialistDocument },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

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

export const reassignCase = async ({
  id,
  specialistDocument,
}: {
  id: number;
  specialistDocument: string;
}) => {
  try {
    const token = localStorage.getItem("token");

    const deleteAllFromCase = axios.delete(
      `${SERVER}/specialist-mentors-clinical-cases/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    await Promise.allSettled([
      assignCase({ id, specialistDocument }),
      deleteAllFromCase,
    ]);

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

const mapClinicalCaseToCasoClinico = async (
  c: ClinicalCaseResponse
): Promise<CasoClinico> => {
  const token = localStorage.getItem("token");
  const { data: specialty } = await axios.get(
    `${SERVER}/specialties/by-id/${c.requiredSpecialtyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const { data: files } = await axios.get<ClinicalCaseFileResponse[]>(
    `${SERVER}/clinical-cases-files/by-clinical-case/${c.id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return {
    id: c.id,
    fechaNacimiento: new Date(c.patientBirthdate).toLocaleString(),
    genero: c.patientGender === "masculine" ? "masculino" : "femenino",
    especialidadRequerida: specialty.name,
    motivoMentoria: c.reason,
    valoracionPaciente: c.patientAssessment,
    descripcionCaso: c.description,
    motivoPaciente: c.patientReason,
    archivosAsociados: files.map((f) => ({ id: f.id, enlace: f.link })),
    editable: c.editable,
  };
};

type ClinicalCaseResponse = {
  id: number;
  description: string;
  reason: string;
  patientBirthdate: string;
  patientGender: "masculine" | "feminine";
  patientReason: string;
  patientAssessment: string;
  requiredSpecialtyId: number;
  editable: boolean;
};

type ClinicalCasePost = {
  description: string;
  reason: string;
  patientBirthdate: string;
  patientGender: "masculine" | "feminine";
  patientReason: string;
  patientAssessment: string;
  requiredSpecialtyId: number;
};

type ClinicalCaseFileResponse = {
  id: number;
  clinicalCaseId: number;
  link: string;
};
