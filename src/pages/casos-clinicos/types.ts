export interface CasoClinico {
  id: number;
  fechaNacimiento: string;
  genero: string;
  especialidadRequerida: string;
  motivoMentoria: string;
  valoracionPaciente: string;
  descripcionCaso: string;
  archivosAsociados: Archivo[] | null;
}

export interface Archivo {
  id: number;
  enlace: string;
}

export interface Especialidad {
  id: number;
  name: string;
}

/*Un caso clínico tiene: fecha de nacimiento del paciente, 
género del paciente, 
motivo de consulta del paciente, 
especialidad de la que se requiere mentoría, 
valoración objetiva del paciente, 
descripción breve del caso, 
archivos asociados al caso y 
motivo por el cual se requiere mentoría.*/
