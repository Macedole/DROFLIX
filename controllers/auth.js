exports.getLogin = (req, res) => {
  res.render("auth/login", {
    paginaTitulo: "Login",
    isLoggedIn: false,
  });
};

exports.getCadastro = (req, res) => {
  res.render("auth/cadastro", {
    paginaTitulo: "Criar conta",
    isLoggedIn: false,
  });
};
