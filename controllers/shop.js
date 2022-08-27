exports.getIndex = (req, res) => {
  res.render("shop/index", {
    paginaTitulo: "Droflix",
  });
};
