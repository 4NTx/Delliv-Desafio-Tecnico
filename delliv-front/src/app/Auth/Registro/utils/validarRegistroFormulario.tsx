interface ValoresFormulario {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
}

const validarEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validarDadosFormulario = (valores: ValoresFormulario) => {
  let erros: any = {};

  if (!valores.nome) erros.nome = "O nome é obrigatório.";
  if (!valores.email) {
    erros.email = "O e-mail é obrigatório.";
  } else if (!validarEmail(valores.email)) {
    erros.email = "Formato de e-mail inválido.";
  }
  if (valores.senha.length < 6) {
    erros.senha = "A senha deve ter pelo menos 6 caracteres.";
  }
  if (!valores.cargo) erros.cargo = "O cargo é obrigatório.";

  return erros;
};

export default validarDadosFormulario;
