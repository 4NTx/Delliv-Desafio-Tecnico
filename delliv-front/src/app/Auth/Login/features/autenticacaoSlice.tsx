// src/app/features/autenticacaoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EstadoAutenticacao {
  usuario: string | null;
  token: string | null;
}

const estadoInicial: EstadoAutenticacao = {
  usuario: null,
  token: null,
};

const autenticacaoSlice = createSlice({
  name: "autenticacao",
  initialState: estadoInicial,
  reducers: {
    definirCredenciais: (
      estado,
      acao: PayloadAction<{ usuario: string; token: string }>
    ) => {
      estado.usuario = acao.payload.usuario;
      estado.token = acao.payload.token;
    },
    sair: (estado) => {
      estado.usuario = null;
      estado.token = null;
    },
  },
});

export const { definirCredenciais, sair } = autenticacaoSlice.actions;

export default autenticacaoSlice.reducer;
