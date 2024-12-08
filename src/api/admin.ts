import axios from "axios";
import { SERVER } from "./server";
import {
  Admin,
  RuralProfessionalsAdmin,
  SpecialistAdmin,
} from "../pages/casos-clinicos/types";

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

export async function getAdmins(query: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/admins/all?query=${query}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.data as Admin[];
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Error obteniendo administradores",
      };
    } else {
      console.error("Error inesperado:", error);
      return {
        success: false as const,
        error: "Error obteniendo administradores",
      };
    }
  }
}

export async function getSpecialist(document: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/specialists/${document}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.data as SpecialistAdmin;
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Especialista no encontrado",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Especialista no encontrado" };
    }
  }
}

export async function getSpecialistBySpeciality(
  search: string,
  specialityId: number
) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${SERVER}/specialists/all/speciality/${specialityId}?query=${search}`,
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

export async function updateSpecialistPassword({
  document,
  password,
}: {
  document: string;
  password: string;
}) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${SERVER}/specialists/${document}`,
      {
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as SpecialistAdmin;
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

export async function getRural(document: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${SERVER}/rural-professionals/${document}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as RuralProfessionalsAdmin;
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Especialista no encontrado",
      };
    } else {
      console.error("Error inesperado:", error);
      return { success: false as const, error: "Especialista no encontrado" };
    }
  }
}

export async function updateRuralPassword({
  document,
  password,
}: {
  document: string;
  password: string;
}) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${SERVER}/rural-professionals/${document}`,
      {
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as RuralProfessionalsAdmin;
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

export async function getAdmin(email: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER}/admins/${email}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.data as Admin;
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false as const,
        error: "Error obteniendo administrador",
      };
    } else {
      console.error("Error inesperado:", error);
      return {
        success: false as const,
        error: "Error obteniendo administrador",
      };
    }
  }
}

export async function updateAdminPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${SERVER}/admins/${email}`,
      {
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as Admin;
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

export async function createAdmin({
  email,
  fullName,
  password,
}: {
  email: string;
  fullName: string;
  password: string;
}) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${SERVER}/admins/`,
      {
        email,
        fullName,
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = response.data as Admin;
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
