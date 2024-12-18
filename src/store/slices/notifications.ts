import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type NotificationState = {
  feedbackCount?: number;
  messagesCount?: number;
  assignedCasesCount?: number;
  newCasesCount?: number;
};

const initialState: NotificationState = {
  feedbackCount: undefined,
  messagesCount: undefined,
  assignedCasesCount: undefined,
  newCasesCount: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (_state, action: PayloadAction<NotificationState>) => {
      return action.payload;
    },
    clearNotifications: () => initialState,
  },
});

export const { setNotifications, clearNotifications } =
  notificationsSlice.actions;
