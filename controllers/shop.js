const dadosTeste = require("../dados-teste/dados.json");

class ShopController {
  async getIndex(req, res) {
    res.render("shop/index", {
      paginaTitulo: "Droflix",
      produtosPromocao: dadosTeste.produtosPromocao,
      produtos: dadosTeste.produtos,
      servicos: dadosTeste.servicos,
      isLoggedIn: false,
      isAdmin: false,
    });
  }

  async getEnviarParcerias(req, res) {
    res.render("shop/enviar-parcerias", {
      paginaTitulo: "Enviar parcerias",
      isLoggedIn: false,
      isAdmin: false,
    });
  }

  async getProduto(req, res) {
    const produtoId = req.params.produtoId;
    const produto = dadosTeste.produtos.find((produto) => produto.id.toString() === produtoId);
    res.render("shop/detalhes-produto", {
      produto: produto,
      paginaTitulo: `Detalhes - ${produto.titulo}`,
      isLoggedIn: false,
      isAdmin: false,
    });
  }

  async getServico(req, res) {
    const servicoId = req.params.servicoId;
    const servico = dadosTeste.servicos.find((servico) => servico.id.toString() === servicoId);
    res.render("shop/detalhes-servico", {
      servico: servico,
      paginaTitulo: `Detalhes - ${servico.titulo}`,
      isAdmin: false,
      isLoggedIn: false,
    });
  }

  async renderAgendamento(req, res) {
    res.render("shop/agendar-servico", {
      paginaTitulo: "Agendar serviço",
      isAdmin: false,
      isLoggedIn: false,
    });
  }
}

module.exports = new ShopController();
