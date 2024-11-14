export interface CasoClinico {
  id: number;
  fechaNacimiento: string;
  genero: "masculino" | "femenino";
  especialidadRequerida: string;
  motivoMentoria: string;
  valoracionPaciente: string;
  descripcionCaso: string;
  motivoPaciente: string;
  archivosAsociados: Archivo[] | null;
}

export interface EditarCasoClinico {
  fechaNacimiento: string;
  genero: "masculino" | "femenino";
  especialidadRequerida: string;
  motivoMentoria: string;
  valoracionPaciente: string;
  descripcionCaso: string;
  motivoPaciente: string;
}

export interface CrearCasoClinico {
  fechaNacimiento: string;
  genero: "masculino" | "femenino";
  especialidadRequerida: number;
  motivoMentoria: string;
  valoracionPaciente: string;
  descripcionCaso: string;
  motivoPaciente: string;
  archivosAsociados: File[] | null;
}

export interface Archivo {
  id: number;
  enlace: string;
}

export interface Especialidad {
  id: number;
  name: string;
}

export interface Feedback {
  id: number;
  fecha: string;
  hora: string;
  texto: string;
  autor: string;
  rol: string;
}

export interface ChatRoom {
  id: number;
  roomName: string;
  ownerDocument: string;
  lastMessageContent: string | null;
  lastMessageType: "text" | "image" | "audio" | null;
  lastMessageCreated: string | null;
}

export interface ChatRoomCreated {
  id: number;
  roomName: string;
  ownerDocument: string;
}

export interface ChatMessage {
  id: number;
  senderName: string;
  content: string;
  messageType: "text" | "image" | "audio";
  createdAt: string;
}

/*Un caso clínico tiene: fecha de nacimiento del paciente, 
género del paciente, 
motivo de consulta del paciente, 
especialidad de la que se requiere mentoría, 
valoración objetiva del paciente, 
descripción breve del caso, 
archivos asociados al caso y 
motivo por el cual se requiere mentoría.*/
