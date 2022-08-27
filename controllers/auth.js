exports.getLogin = (req, res) => {
  res.render("auth/login", {
    paginaTitulo: "Login",
  });
};

exports.getCadastro = (req, res) => {
  res.render("auth/cadastro", {
    paginaTitulo: "Criar conta",
  });
};
