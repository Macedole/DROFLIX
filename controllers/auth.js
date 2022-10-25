class AuthController {
  getLogin(req, res) {
    res.render("auth/login", {
      paginaTitulo: "Login",
      isLoggedIn: false,
    });
  };

  getCadastro(req, res) {
    res.render("auth/cadastro", {
      paginaTitulo: "Criar conta",
      isLoggedIn: false,
    });
  };
}

module.exports = new AuthController;