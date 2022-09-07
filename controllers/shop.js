const dadosTeste = require("../dados-teste/dados.json");

class ShopController {
	async getIndex(req, res) {
		res.render("shop/index", {
			paginaTitulo: "Droflix",
			produtosPromocao: dadosTeste.produtosPromocao,
			produtos: dadosTeste.produtos,
			servicos: dadosTeste.servicos
		});
	}

	async getEnviarParcerias(req, res) {
		res.render("shop/enviar-parcerias", {
			paginaTitulo: "Enviar parcerias",
		});
	}
}

module.exports = new ShopController;