const dadosTeste = require("../dados-teste/dados.json");
const Produto = require("../models/Produto");

class ShopController {
  async getIndex(req, res) {
    const produtos = await Produto.getProdutos(true);
    res.render("shop/index", {
      paginaTitulo: "Droflix",
      produtos: produtos,
      servicos: dadosTeste.servicos,
      isAdmin: false,
    });
  }

  async getEnviarParcerias(req, res) {
    res.render("shop/enviar-parcerias", {
      paginaTitulo: "Enviar parcerias",
      isLoggedIn: false,
    });
  }

  async getServico(req, res) {
    const servicoId = req.params.servicoId;
    const servico = dadosTeste.servicos.find((servico) => servico.id.toString() === servicoId);
    res.render("shop/detalhes-servico", {
      servico: servico,
      paginaTitulo: `${servico.titulo}`,
      isLoggedIn: false,
    });
  }

  async renderAgendamento(req, res) {
    res.render("shop/agendar-servico", {
      paginaTitulo: "Agendar serviço",
      isLoggedIn: false,
    });
  }
}

module.exports = new ShopController();
