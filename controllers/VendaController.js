require("dotenv").config();
const Cliente = require("../models/Cliente");
const Carrinho = require("../models/Carrinho");
const Venda = require("../models/Venda");
const Cupom = require("../models/Cupom");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let idCliente, cliente, venda, vendaProdutos, produtosCarrinho, totalVenda;

class VendaController {
  async renderConfirmacao(req, res) {
    idCliente = req.session.cliente;

    // buscar o cliente
    cliente = await Cliente.getCustomer({
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

  async verificaCupom(req, res) {
    const cupom = req.body.cupom;

    const response = await Cupom.getCupomCarrinho({ codigo: cupom });

    if(response.length == 0) {
      return res.json( { erro: true, mensagem: "Cupom Inválido!" } );
    }

    return res.json({ erro: false, cupom: response[0] });
  }

  async confirmaCompra(req, res) {
    // alterar o valor e a data da venda no banco de dados
    await Venda.editPrecoVenda({
      precoFinal: totalVenda,
      dataVenda: new Date(),
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

    // enviar email
    const email = cliente[0].email;
    const msg = {
      to: email,
      from: "suporte.droflix@gmail.com",
      subject: "Sua compra foi confirmada!",
      html: `
        <h1>Obrigado por comprar com a Droflix!</h1>
        <h3> Seu pedido está sendo processado e será enviado em até 5 dias úteis.</h3>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("E-mail enviado com sucesso!");
    } catch (error) {
      console.log(error);
    }

    res.render("shop/finalizacao", {
      paginaTitulo: "Finalização",
    });
  }

  async renderVendasCli(req, res) {
    idCliente = req.session.cliente;
    const produtos = await Venda.getComprasCli(idCliente);
    res.render("shop/compras-cliente", {
      paginaTitulo: "Minhas compras",
      produtos: produtos,
    });
  }

  async renderAllVendas(req, res) {
    const produtos = await Venda.getAllVendas();
    res.render("admin/vendas", {
      paginaTitulo: "Vendas realizadas",
      produtos: produtos,
    });
  }
}

module.exports = new VendaController();
