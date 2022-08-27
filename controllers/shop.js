exports.getIndex = (req, res) => {
  res.render("shop/index", {
    paginaTitulo: "Droflix",
  });
};

exports.getEnviarParcerias = (req, res) => {
  res.render("shop/enviar-parcerias", {
    paginaTitulo: "Enviar parcerias",
  });
};
