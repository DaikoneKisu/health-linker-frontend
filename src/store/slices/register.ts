import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {}

const initialState: AuthState = {};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegister: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
    clearRegister: () => initialState,
  },
});

export const { setRegister, clearRegister } = registerSlice.actions;
