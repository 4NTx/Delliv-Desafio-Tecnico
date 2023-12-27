import { configureStore } from "@reduxjs/toolkit";
import autenticacaoReducer from "./app/Auth/Login/features/autenticacaoSlice";

export const reduxStore = configureStore({
  reducer: {
    autenticacao: autenticacaoReducer,
  },
});
