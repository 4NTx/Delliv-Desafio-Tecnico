import React from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { toast, ToastContainer, Flip } from "react-toastify";
import useLoginFormulario from "@/app/Auth/Login/hooks/useLoginFormulario";
import validarDadosLogin from "@/app/Auth/Login/utils/validarLoginFormulario";
import styles from "@/app/Auth/styles/formularioLogin.module.css";
import "react-toastify/dist/ReactToastify.css";

const FormLogin = () => {
  const valoresIniciais = { email: "", senha: "" };
  const { valores, erros, lidarComMudanca, validarFormulario } =
    useLoginFormulario(valoresIniciais, validarDadosLogin);

  const lidarComEnvio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validarFormulario()) {
      toast.error("Por favor, corrija os erros antes de prosseguir.");
      return;
    }

    try {
      const resposta = await axios.post(
        "http://localhost:3000/usuarios/login",
        valores
      );
      localStorage.setItem("jwt", resposta.data.access_token);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Erro ao fazer login. Tente novamente.");
        }
      } else {
        console.error("Erro ao fazer login:", error);
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tituloLogin}>LOGIN</div>
      <form onSubmit={lidarComEnvio}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={valores.email}
          onChange={lidarComMudanca}
          error={!!erros.email}
          helperText={erros.email}
          fullWidth
          className={styles.inputField}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          name="senha"
          value={valores.senha}
          onChange={lidarComMudanca}
          error={!!erros.senha}
          helperText={erros.senha}
          fullWidth
          className={styles.inputField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.botaoLogin}
        >
          Entrar
        </Button>
        <ToastContainer
          position="top-center"
          limit={2}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Flip}
        />
      </form>
    </div>
  );
};

export default FormLogin;
