import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { bibliotecaApi } from "./bibliotecaApi";
import authorReducer from "src/modules/authors/slice/authorSlice"
import { authorApi } from "src/modules/authors/slice/authorApiSlice";

export const store = configureStore({
  reducer: {
    [authorApi.reducerPath]: authorApi.reducer,
    author: authorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bibliotecaApi.middleware),
});

setupListeners(store.dispatch);

// root redux types based on store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
