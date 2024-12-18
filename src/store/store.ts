import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/user";
import { roleSlice } from "./slices/role";
import { notificationsSlice } from "./slices/notifications";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "role", "notifications"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  role: roleSlice.reducer,
  notifications: notificationsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
