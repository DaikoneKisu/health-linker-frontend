export interface CasoClinico {
  id: number;
  nombre: string;
  fNacimiento: string;
  genero: string;
  especialidad: string;
  valoracionPaciente: string;
  descripcionCaso: string;
  archivoAsociado: string;
  MotivoMentoria: string;
  estatus: boolean;
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
