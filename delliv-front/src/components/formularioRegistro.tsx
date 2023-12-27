import React from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { toast, ToastContainer, Flip } from "react-toastify";
import useFormulario from "@/app/Auth/Registro/hooks/useRegistroFormulario";
import validarDadosFormulario from "@/app/Auth/Registro/utils/validarRegistroFormulario";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/app/Auth/styles/formularioRegistro.module.css";

const FormRegistro = () => {
  const valoresIniciais = { nome: "", email: "", senha: "", cargo: "" };
  const { valores, erros, lidarComMudanca, validarFormulario } = useFormulario(
    valoresIniciais,
    validarDadosFormulario
  );

  const lidarComEnvio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validarFormulario()) {
      toast.error("Por favor, corrija os erros antes de prosseguir.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/usuarios/registro", valores);
      toast.success("Usuário registrado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Erro ao registrar. Tente novamente.");
        }
      } else {
        console.error("Erro ao registrar:", error);
        toast.error("Erro ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tituloRegistro}>REGISTRO</div>
      <form onSubmit={lidarComEnvio}>
        <TextField
          label="Nome"
          variant="outlined"
          name="nome"
          value={valores.nome}
          onChange={lidarComMudanca}
          error={!!erros.nome}
          helperText={erros.nome}
          fullWidth
          className={styles.inputField}
        />
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
        <FormControl
          fullWidth
          className={styles.selectField}
          error={!!erros.cargo}
        >
          <InputLabel id="cargo-label">Cargo</InputLabel>
          <Select
            labelId="cargo-label"
            value={valores.cargo}
            label="Cargo"
            name="cargo"
            onChange={lidarComMudanca}
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"VENDEDOR"}>VENDEDOR</MenuItem>
            <MenuItem value={"USUARIO"}>USUÁRIO</MenuItem>
          </Select>
          <FormHelperText>{erros.cargo}</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.botaoRegistrar}
        >
          Registrar
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

export default FormRegistro;
