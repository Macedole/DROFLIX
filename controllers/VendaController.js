const Cliente = require("../models/Cliente");
const Carrinho = require("../models/Carrinho");
const Venda = require("../models/Venda");
let idCliente, venda, vendaProdutos, produtosCarrinho, totalVenda;

class VendaController {
  async renderConfirmacao(req, res) {
    idCliente = req.session.cliente;

    // buscar o cliente
    const cliente = await Cliente.getCustomer({
      campo: "id",
      valor: idCliente,
    });

    // buscar a TB_VENDA
    venda = await Carrinho.getVenda(idCliente);

    // buscar os produtos de TB_VENDA
    vendaProdutos = await Carrinho.getVendaProdutos(venda.PK_idVenda);
    produtosCarrinho = await Carrinho.getProdutosCarrinho(vendaProdutos.FK_idVenda);

    // calcular o valor total da compra
    totalVenda = produtosCarrinho.reduce((acc, obj) => {
      return acc + +obj.preco;
    }, 0);

    res.render("shop/confirmar-compra", {
      paginaTitulo: "Confirmar compra",
      cliente: cliente[0],
      produtos: produtosCarrinho,
      total: totalVenda,
    });
  }

  async confirmaCompra(req, res) {
    // alterar o valor da venda no banco de dados
    await Venda.editPrecoVenda({
      precoFinal: totalVenda,
      idCliente: idCliente,
    });

    // alterar o status da venda no banco de dados
    await Venda.editStatusVenda({
      status: 2,
      idCliente: idCliente,
    });

    // criar um novo carrinho para o cliente
    await Carrinho.criarCarrinho({
      data: new Date(),
      preco: 0,
      desconto: 0,
      idCliente: idCliente,
      idStatus: 3,
    });

    res.render("shop/finalizacao", {
      paginaTitulo: "Finalização",
    });
  }
}

module.exports = new VendaController();
