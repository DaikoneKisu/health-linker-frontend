import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  auth: boolean;
}

const initialState: AuthState = {
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
