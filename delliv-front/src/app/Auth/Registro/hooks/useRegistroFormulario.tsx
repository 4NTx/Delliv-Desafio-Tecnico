import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

interface ValoresFormulario {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
}
type EventoMudanca =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

const useFormulario = (
  valoresIniciais: ValoresFormulario,
  validar: (valores: ValoresFormulario) => any
) => {
  const [valores, setValores] = useState<ValoresFormulario>(valoresIniciais);
  const [erros, setErros] = useState<any>({});

  const lidarComMudanca = (e: EventoMudanca) => {
    const nome = e.target.name as keyof ValoresFormulario;
    const valor = e.target.value;
    setValores({ ...valores, [nome]: valor });
    setErros({ ...erros, [nome]: "" });
  };

  const validarFormulario = () => {
    const erros = validar(valores);
    setErros(erros);
    return Object.keys(erros).length === 0;
  };

  return { valores, erros, lidarComMudanca, validarFormulario };
};

export default useFormulario;
