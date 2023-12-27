interface ValoresLogin {
  email: string;
  senha: string;
}

const validarEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validarDadosLogin = (valores: ValoresLogin) => {
  let erros: any = {};

  if (!valores.email) {
    erros.email = "O e-mail é obrigatório.";
  } else if (!validarEmail(valores.email)) {
    erros.email = "Formato de e-mail inválido.";
  }

  if (!valores.senha) {
    erros.senha = "A senha é obrigatória.";
  } else if (valores.senha.length < 6) {
    erros.senha = "A senha deve ter pelo menos 6 caracteres.";
  }

  return erros;
};

export default validarDadosLogin;
