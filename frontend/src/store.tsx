import { configureStore } from "@reduxjs/toolkit";
import { astrologerApi } from "./redux/services/astrologer";

export const store = configureStore({
  reducer: {
    [astrologerApi.reducerPath]: astrologerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astrologerApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
