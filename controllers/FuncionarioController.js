const modelFuncionario = require("../models/Funcionario.js");
const modelCliente = require("../models/Cliente.js");
const modelEndereco = require("../models/Endereco.js");
const modelConvenio = require("../models/Convenio.js");
const dadosTeste = require("../dados-teste/dados.json");

const formatDate = require("../public/assets/utils/formatDate.js");

const jwt = require("jsonwebtoken");
const jwtSecret = require("../middlewares/authConfig.json");
const bcrypt = require("bcryptjs");

class FuncionarioController {
  renderLogin(req, res) {
    return res.render("admin/login", {
      paginaTitulo: "Login",
      isLoggedIn: false,
    });
  }

  renderCadastro(req, res) {
    res.render("admin/cadastrar-funcionario.ejs", {
      paginaTitulo: "Cadastro de Funcionário",
      isAdmin: true,
      acao: "C",
    });
  }
  async storeFuncionario(req, res) {
    const {acao, cpf, nome, email, dataNasc, telefone, senha, confirmSenha, logradouro, numero, bairro, complemento, cidade, uf, cep} = req.body;

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
    } else if (acao === "C" && senha.length < 6) {
      mensagem = "A senha deve possuir pelo menos 6 caracteres!";
    } else if (acao === "C" && !confirmSenha) {
      mensagem = "Preencha a confirmação da senha corretamente!";
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
        uf,
      });
    }

    let funcionario = await modelFuncionario.getFuncionario({
      campo: "cpf",
      valor: cpfFormatado,
    });

    if (funcionario.length > 0 && acao !== "U") {
      return res.json({
        erro: true,
        mensagem: "Já existe um funcionário com o esse CPF cadastrado!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    funcionario = await modelFuncionario.storeFuncionario({
      acao,
      idFuncionario: funcionario.length > 0 ? funcionario[0].id_funcionario : null,
      cpf: cpfFormatado,
      nome,
      email,
      dataNasc: dataNascFormatada,
      telefone: telefoneFormatado,
      senha: hash,
      idEndereco: idEndereco[0].id_endereco,
    });

    return res.json({
      erro: false,
      idFuncionario: funcionario[0].id_funcionario,
      mensagem: funcionario[0].mensagem,
    });
  }

  async getFuncionario(req, res) {
    const {id} = req.params;

    const funcionario = await modelFuncionario.getFuncionario({
      campo: "id",
      valor: id,
    });

    if (funcionario.length == 0) {
      return res.status(404).render("erro/404.ejs", {
        item: "funcionário",
        paginaTitulo: "Erro",
        isAdmin: true,
      });
    }

    funcionario[0].dataNasc = formatDate(funcionario[0].dataNasc);

    res.render("admin/cadastrar-funcionario.ejs", {
      paginaTitulo: "Cadastro de Funcionário",
      isAdmin: true,
      funcionario: funcionario[0],
      acao: "U",
    });
  }

  async pesquisaUsuario(req, res) {
    const {email} = req.body;
    const {usuario} = req.body;

    if (usuario === "funcionario") {
      const funcionario = await modelFuncionario.getFuncionario({
        campo: "email",
        valor: email,
      });

      if (funcionario.length == 0) {
        return res.status(404).render("erro/404.ejs", {
          item: "funcionário",
          paginaTitulo: "Erro",
          isAdmin: true,
        });
      }

      funcionario[0].dataNasc = formatDate(funcionario[0].dataNasc);

      res.render("admin/cadastrar-funcionario.ejs", {
        paginaTitulo: "Dados do funcionário",
        isAdmin: true,
        funcionario: funcionario[0],
        acao: "U",
      });
    } else {
      const customer = await modelCliente.getCustomer({
        campo: "email",
        valor: email,
      });

      if (customer.length == 0) {
        return res.status(404).render("erro/404.ejs", {
          item: "cliente",
          paginaTitulo: "Erro",
          isAdmin: true,
        });
      }

      customer[0].dataNascCliente = formatDate(customer[0].dataNascCliente);

      const convenios = await modelConvenio.getConvenios();

      res.render("auth/cadastro.ejs", {
        paginaTitulo: "Dados do cliente",
        isAdmin: false,
        cliente: customer[0],
        acao: "U",
        convenios,
      });
    }
  }

  async getFuncionarioLogin(req, res) {
    const { email, senha } = req.body;

    const funcionario = await modelFuncionario.getFuncionario({campo: "email", valor: email});

    if (funcionario.length == 0) {
      return res.json({erro: true, mensagem: "Funcionário não localizado em nossa base de dados!"});
    }

    if (!bcrypt.compareSync(senha, funcionario[0].senha)) {
      return res.json({erro: true, mensagem: "E-mail ou senha incorretos!"});
    } else {
      jwt.sign({idFuncionario: funcionario[0].id_funcionario}, jwtSecret.secret, {expiresIn: "1h"}, (err, token) => {
        if (err) {
          return res.json({erro: true, mensagem: "Houve um erro ao validar o funcionário!"});
        } else {
          req.session.tokenFuncionario = `Bearer ${token}`;
          req.session.isLoggedIn = true;
          req.session.funcionario = funcionario[0].id_funcionario;
          return res.json({erro: false, id: funcionario[0].id_funcionario});
        }
      });
    }
  }





  async procurarUsuario(req, res) {
    res.render("admin/procurar-usuarios", {
      paginaTitulo: "Procurar usuários",
      isAdmin: true,
    });
  }

  async getSolicitacoes(req, res) {
    res.render("admin/solicitacoes", {
      paginaTitulo: "Solicitações",
      solicitacoes: dadosTeste.solicitacoes,
      isAdmin: true,
    });
  }

  async getSolicitacao(req, res) {
    const solicitacaoId = req.params.solicitacaoId;
    const solicitacao = dadosTeste.solicitacoes.find((solicitacao) => solicitacao.id.toString() === solicitacaoId);
    res.render("admin/solicitacao", {
      solicitacao: solicitacao,
      paginaTitulo: `Solicitação de ${solicitacao.nome}`,
      isAdmin: true,
    });
  }

  async getCupons(req, res) {
    res.render("admin/cupons", {
      cupons: dadosTeste.cupons,
      paginaTitulo: "Cupons de desconto",
      isAdmin: true,
    });
  }

  async getEntregas(req, res) {
    res.render("admin/entregas", {
      paginaTitulo: "Entregas realizadas",
      entregas: dadosTeste.entregas,
      isAdmin: true,
    });
  }

  async teste(req, res) {
    return res.json({req: req.body});
  }
}

module.exports = new FuncionarioController();
