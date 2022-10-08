const modelCliente = require("../models/Cliente.js");
const modelEndereco = require("../models/Endereco.js");
const modelConvenio = require("../models/Convenio.js");

const formatDate = require("../public/assets/utils/formatDate.js");

class ClienteController {
  async renderCadastro(req, res) {
    const convenios = await modelConvenio.getConvenios();

    res.render("auth/cadastro.ejs", {
      paginaTitulo: "Cadastro de Cliente",
      isLoggedIn: false,
      isAdmin: false,
      acao: "C",
      convenios
    });
  }

  async storeCustomer(req, res) {
    const { acao, cpf, nome, email, dataNasc, telefone, idConvenio, logradouro, numero, bairro, complemento, cidade, uf, cep, receberNotificacao, senha, confirmaSenha } = req.body;
    let mensagem = "";
    if (cpf.length < 14) {
      mensagem = "Preencha o CPF corretamente!";
    } else if (!nome) {
      mensagem = "Preencha o nome corretamente!";
    } else if (!email) {
      mensagem = "Preencha o e-mail corretamente!";
    } else if (!dataNasc) {
      mensagem = "Preencha a data de nascimento corretamente!";
    } else if (!telefone) {
      mensagem = "Preencha o telefone corretamente!";
    } else if(acao === 'C' && senha.length < 6) {
      mensagem = 'A senha deve possuir pelo menos 6 caracteres!';
    } else if(acao === 'C' && !confirmaSenha) {
      mensagem = 'Preencha a confirmação da senha corretamente!';
    } else if (!logradouro) {
      mensagem = "Preencha o logradouro da residência corretamente!";
    } else if (!numero) {
      mensagem = "Preencha o numero da residência corretamente!";
    } else if (!bairro) {
      mensagem = "Preencha o bairro da residência corretamente!";
    } else if (!cidade) {
      mensagem = "Preencha a cidade da residência corretamente!";
    } else if (!uf) {
      mensagem = "Preencha o UF da residência corretamente!";
    } else if (!cep) {
      mensagem = "Preencha o CEP da residência corretamente!";
    }

    const cepFormatado = cep.replace("-", "");
    const cpfFormatado = cpf.replace(/[^\d]/g, "");
    const telefoneFormatado = telefone.replace(/[^\d]/g, "");
    let dataNascFormatada = dataNasc.split("/");
    dataNascFormatada = `${dataNascFormatada[2]}-${dataNascFormatada[1]}-${dataNascFormatada[0]}`;

    if (mensagem !== "") {
      return res.json({mensagem, erro: true});
    }

    let idEndereco = await modelEndereco.getEndereco({cep: cepFormatado, numero});

    if (idEndereco.length == 0) {
      idEndereco = await modelEndereco.storeEndereco({
        cep: cep.replace("-", ""),
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf
      });
    }

    let customer = await modelCliente.getCustomer({
      campo: "cpf",
      valor: cpfFormatado,
    });

    if (customer.length > 0 && acao !== "U") {
      return res.json({
        erro: true,
        mensagem: "Já existe um Cliente com o esse CPF cadastrado!",
      });
    }

    customer = await modelCliente.storeCustomer({
      acao,
      cpf: cpfFormatado,
      nome,
      email,
      dataNasc: dataNascFormatada,
      telefone: telefoneFormatado,
      receberNotificacao: receberNotificacao ? 1 : 0,
      idEndereco: idEndereco[0].id_endereco,
      idConvenio
    });

    return res.json({
      erro: false,
      idCustomer: customer[0].idCliente,
      mensagem: customer[0].msg,
    });
  }

  async getCustomer(req, res) {
    const {id} = req.params;

    const customer = await modelCliente.getCustomer({
      campo: "id",
      valor: id,
    });

    if (customer.length == 0) {
      return res.status(404).render("erro/404.ejs", {
        item: "cliente",
      });
    }

    customer[0].dataNascCliente = formatDate(customer[0].dataNascCliente);

    const convenios = await modelConvenio.getConvenios();

    res.render("auth/cadastro.ejs", {
      paginaTitulo: "Dados do cliente",
      isLoggedIn: true,
      isAdmin: false,
      cliente: customer[0],
      acao: "U",
      convenios
    });
  }

  async teste(req, res) {
    return res.json({req: req.body});
  }
}

module.exports = new ClienteController();
