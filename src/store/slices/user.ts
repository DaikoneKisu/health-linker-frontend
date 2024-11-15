import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState extends AdminState {
  document?: string;
  password?: string;
  type?: "rural professional" | "specialist" | "";
}

interface AdminState {
  email: string;
  fullName: string;
  role?: "admin" | "regular" | null;
}

export interface SpecialistState extends UserState {
  specialtyId: number;
}

export interface RuralProfessionalState extends UserState {
  zone: string;
}

const initialState = {
  email: "",
  fullName: "",
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
