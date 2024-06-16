import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";

export interface UserState {}

const initialState: UserState = {};

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

const dispatch = useAppDispatch();
dispatch(setUser({}));
