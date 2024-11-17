import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  fullName: string;
  document: string;
  password: string;
  type: "rural professional" | "specialist" | "";
}

export interface SpecialistState extends UserState {
  specialtyId: number;
}

export interface RuralProfessionalState extends UserState {
  zone: string;
}

const initialState: UserState = {
  email: "",
  fullName: "",
  document: "",
  password: "",
  type: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
