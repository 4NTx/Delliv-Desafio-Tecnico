import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

interface ValoresLogin {
  email: string;
  senha: string;
}
type EventoMudanca =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

const useLoginFormulario = (
  valoresIniciais: ValoresLogin,
  validar: (valores: ValoresLogin) => any
) => {
  const [valores, setValores] = useState<ValoresLogin>(valoresIniciais);
  const [erros, setErros] = useState<any>({});

  const lidarComMudanca = (e: EventoMudanca) => {
    const nome = e.target.name as keyof ValoresLogin;
    const valor = e.target.value;
    setValores({ ...valores, [nome]: valor });
    setErros({ ...erros, [nome]: "" });
  };

  const validarFormulario = () => {
    const errosValidacao = validar(valores);
    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0;
  };

  return { valores, erros, lidarComMudanca, validarFormulario };
};

export default useLoginFormulario;
