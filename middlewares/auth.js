const jwt = require("jsonwebtoken");
const jwtSecret = require("../middlewares/authConfig.json");

function auth(req, res, next) {
  const authToken = req.session.token;

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    jwt.verify(token, jwtSecret.secret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({err: "Token inválido!"});
      } else {
        if(!req.idCliente) {
          req.idCliente = data.idCliente;
        }
        next();
      }
    });
  } else {
    res.status(401);
    res.render("erro/401", {
      paginaTitulo: "Erro",
    });
  }
}

module.exports = auth;
