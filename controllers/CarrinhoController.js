const Carrinho = require("../models/Carrinho");

class CarrinhoController {
  async renderCarrinho(req, res) {
    const idCliente = req.session.cliente;
    // TB_VENDA
    const venda = await Carrinho.getVenda(idCliente);
    // TB_VENDA_PRODUTOS
    const vendaProdutos = await Carrinho.getVendaProdutos(venda.PK_idVenda);
    if (!vendaProdutos) {
      return res.render("shop/carrinho", {
        paginaTitulo: "Carrinho",
        produtos: null,
        valorCarrinho: null,
      });
    }
    // TB_PRODUTO e TB_VENDA_PRODUTO
    const produtos = await Carrinho.getProdutosCarrinho(vendaProdutos.FK_idVenda);
    // cálculo do total do carrinho
    const valorCarrinho = produtos.reduce((acc, obj) => {
      return acc + +(obj.preco * obj.quantidade);
    }, 0);

    // renderizar a página
    res.render("shop/carrinho", {
      paginaTitulo: "Carrinho",
      produtos: produtos,
      valorCarrinho: valorCarrinho.toFixed(2),
    });
  }

  async postCarrinho(req, res) {
    const idProduto = req.body.id;
    const idCliente = req.session.cliente;
    const venda = await Carrinho.getVenda(idCliente);
    const idVenda = venda.PK_idVenda;

    await Carrinho.adicionaCarrinho({
      idProduto: idProduto,
      idVenda: idVenda,
      descontoProduto: 0,
    });

    return res.redirect("/carrinho");
  }

  async deleteCarrinho(req, res) {
    const idProduto = req.body.id;
    const idCliente = req.session.cliente;
    const venda = await Carrinho.getVenda(idCliente);
    const idVenda = venda.PK_idVenda;

    await Carrinho.removerCarrinho(idProduto, idVenda);

    res.redirect("/carrinho");
  }
}

module.exports = new CarrinhoController();
