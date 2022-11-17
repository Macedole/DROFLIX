const Servico = require("../models/Servico");
const Produto = require("../models/Produto");
const modelPesquisa = require("../models/Pesquisa");

class ShopController {
  async getIndex(req, res) {
    const produtos = await Produto.getProdutos(true);
    const servicos = await Servico.getServicos();

    res.render("shop/index", {
      paginaTitulo: "Droflix",
      produtos: produtos,
      servicos: servicos,
    });
  }

  async getEnviarParcerias(req, res) {
    res.render("shop/enviar-parcerias", {
      paginaTitulo: "Enviar parcerias",
    });
  }

  async getPesquisa(req, res) {
    const palavra = req.body.pesquisa;
    const palavra_chave = `%${palavra}%`;
    const pesquisa = await modelPesquisa.getPesquisas(palavra_chave);

    res.render("shop/pesquisa", {
      paginaTitulo: "Pesquisa",
      pesquisaServ: pesquisa[0],
      pesquisaProd: pesquisa[1],
    });
  }
}

module.exports = new ShopController();
