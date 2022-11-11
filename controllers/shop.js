const dadosTeste = require("../dados-teste/dados.json");
const Produto = require("../models/Produto");

class ShopController {
  async getIndex(req, res) {
    const produtos = await Produto.getProdutos(true);

    res.render("shop/index", {
      paginaTitulo: "Droflix",
      produtos: produtos,
      servicos: dadosTeste.servicos
    });
  }

  async getEnviarParcerias(req, res) {
    res.render("shop/enviar-parcerias", {
      paginaTitulo: "Enviar parcerias",
    });
  }

  async getServico(req, res) {
    const servicoId = req.params.servicoId;
    const servico = dadosTeste.servicos.find((servico) => servico.id.toString() === servicoId);
    res.render("shop/detalhes-servico", {
      servico: servico,
      paginaTitulo: `${servico.titulo}`,
    });
  }

}

module.exports = new ShopController();
