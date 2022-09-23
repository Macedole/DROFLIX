const modelFuncionario = require("../models/Funcionario.js");
const modelEndereco = require("../models/Endereco.js");
const dadosTeste = require("../dados-teste/dados.json");

const formatDate = require("../public/assets/utils/formatDate.js");

class FuncionarioController {
  renderCadastro(req, res) {
    res.render("admin/cadastrar-funcionario.ejs", {
      paginaTitulo: "Cadastro de Funcionário",
      isLoggedIn: true,
      isAdmin: true,
    });
  }

  async storeFuncionario(req, res) {
    const {cpf, nome, email, dataNasc, telefone, cargo, departamento, salario, logradouro, numero, bairro, complemento, cidade, uf, cep} = req.body;

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
    } else if (!cargo) {
      mensagem = "Preencha o cargo corretamente!";
    } else if (!departamento) {
      mensagem = "Selecione o departamento!";
    } else if (!salario) {
      mensagem = "Preencha o salário corretamente!";
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
    const salarioFormatado = salario.replace(".", "").replace(",", ".");

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
      dado: "cpf",
      valor: cpfFormatado,
    });

    if (funcionario.length > 0) {
      return res.json({
        erro: true,
        mensagem: "Já existe um funcionário com o esse CPF cadastrado!",
      });
    }

    funcionario = await modelFuncionario.storeFuncionario({
      cpf: cpfFormatado,
      nome,
      email,
      dataNasc: dataNascFormatada,
      telefone: telefoneFormatado,
      cargo,
      salario: salarioFormatado,
      idEndereco: idEndereco[0].id_endereco,
      idDepartamento: departamento,
    });

    return res.json({
      erro: false,
      idFuncionario: funcionario[0].id_funcionario,
      mensagem: funcionario[0].mensagem,
    });
  }

  async renderCadastroProduto(req, res) {
    res.render("admin/cadastrar-produto", {
      paginaTitulo: "Cadastrar produto",
      isLoggedIn: true,
      isAdmin: true,
    });
  }

  async renderCadastroServico(req, res) {
    res.render("admin/cadastrar-servico", {
      paginaTitulo: "Cadastrar serviço",
      isLoggedIn: true,
      isAdmin: true,
    });
  }

  async procurarUsuario(req, res) {
    res.render("admin/procurar-usuarios", {
      paginaTitulo: "Procurar usuários",
      isLoggedIn: true,
      isAdmin: true,
    });
  }

  async getSolicitacoes(req, res) {
    res.render("admin/solicitacoes", {
      paginaTitulo: "Solicitações",
      solicitacoes: dadosTeste.solicitacoes,
      isLoggedIn: true,
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
      isLoggedIn: true,
    });
  }

  async getCupons(req, res) {
    res.render("admin/cupons", {
      cupons: dadosTeste.cupons,
      paginaTitulo: "Cupons de desconto",
      isAdmin: true,
      isLoggedIn: true,
    });
  }

  async getEntregas(req, res) {
    res.render("admin/entregas", {
      paginaTitulo: "Entregas realizadas",
      entregas: dadosTeste.entregas,
      isAdmin: true,
      isLoggedIn: true,
    });
  }

  async teste(req, res) {
    return res.json({req: req.body});
  }
}

module.exports = new FuncionarioController();
