import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Role = "admin" | "regular" | "";

const initialState = "" satisfies Role;

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (_state, action: PayloadAction<Role>) => {
      return action.payload;
    },
    clearRole: () => initialState,
  },
});

export const { setRole, clearRole } = roleSlice.actions;
