const modelServico = require("../models/Servico");
const modelCliente = require("../models/Cliente");

class servicoController {
  async renderCadastroServico(req, res) {
    const {id} = req.params;
    const servico = await modelServico.getServico(id);
    res.render("admin/cadastrar-servico", {
      paginaTitulo: "Cadastrar serviço",
      servico,
      acao: "C",
    });
  }

  async storeServico(req, res) {
    const {servicoId, acao, titulo, duracao, agenda, preco, descricao, url} = req.body;

    let mensagem = "";

    if (titulo == "") {
      mensagem = "Preencha o titulo corretamente!";
    } else if (!url) {
      mensagem = "Informe a url da imagem!";
    } else if (!duracao) {
      mensagem = "Informe a duração do serviço!";
    } else if (!preco) {
      mensagem = "Informe o preço do serviço!";
    } else if (!descricao) {
      mensagem = "Informe uma breve descrição do serviço!";
    }

    if (mensagem !== "") {
      return res.json({mensagem, erro: true});
    }

    const precoFormatado = preco.replace(",", ".");

    let servico = await modelServico.getServico(servicoId);

    servico = await modelServico.storeServico({
      servicoId: servico.length > 0 ? servico[0].id : null,
      acao,
      titulo,
      duracao,
      agenda,
      preco: precoFormatado,
      descricao,
      url,
    });

    return res.json({
      erro: false,
      idServico: servico[0].idServico,
      mensagem: servico[0].mensagem,
    });
  }

  // exibição do serviço para o funcionário (edição)
  async getServicos(req, res) {
    const {id} = req.params;
    const servico = await modelServico.getServico(id);
    res.render("admin/cadastrar-servico", {
      paginaTitulo: "Cadastrar serviço",
      servico: servico[0],
      acao: "U",
    });
  }

  // exibição do serviço para o cliente
  async getServico(req, res) {
    const {id} = req.params;
    const servico = await modelServico.getServico(id);
    res.render("shop/detalhes-servico", {
      paginaTitulo: `${servico[0].titulo}`,
      servico: servico[0],
    });
  }

  async renderAgendamento(req, res) {
    const id = null;
    const servico = await modelServico.getServico(id);
    res.render("shop/agendar-servico", {
      paginaTitulo: "Agendar serviço",
      servico,
    });
  }

  async storeAgendamento(req, res) {
    const {servico, data, hora, cpf} = req.body;
    const cliente = req.session.cliente;

    let mensagem = "";

    if (cliente == undefined) {
      mensagem = "YOU MUST BE LOGGED INTO THE SYSTEM !";
    }

    if (cpf.length < 14) {
      mensagem = "Preencha o CPF corretamente!";
    } else if (!servico) {
      mensagem = "Selecione um serviço!";
    } else if (!data) {
      mensagem = "Informe a data!";
    } else if (!hora) {
      mensagem = "Informe a hora!";
    }

    if (mensagem !== "") {
      return res.json({mensagem, erro: true});
    }

    const cpfFormatado = cpf.replace(/[^\d]/g, "");
    let dataFormatada = data.split("/");
    dataFormatada = `${dataFormatada[2]}-${dataFormatada[1]}-${dataFormatada[0]}`;

    const client = await modelCliente.getCustomer({
      campo: "id",
      valor: cliente,
    });

    if (cpfFormatado !== client[0].cpf) {
      mensagem = "ATENÇÃO O SEU CPF NÃO CONFERE";
    }

    if (mensagem !== "") {
      return res.json({mensagem, erro: true});
    }

    const agendamento = await modelServico.storeAgendamento({
      servico,
      cliente,
      data: dataFormatada,
      hora,
    });

    return res.json({
      erro: false,
      idAgendamento: agendamento[0].id,
      mensagem: agendamento[0].mensagem,
    });
  }

  async  listarAgendamento(req, res) {
    const lista = await modelServico.getAgendamento();

    res.render("admin/lista_agendamento", {
      paginaTitulo: "Agendar serviço",
      lista: lista,
    });
  }

  async baixar(req, res) {
    const id = req.session.funcionario;
    const {servico} = req.body;
    console.log(id + " - " + servico);
    const baixa = await modelServico.baixarServico({funcionario: id, servico: servico});
    console.log(baixa);
    res.json({
      erro:  false,
      mensagem: baixa[0].mensagem,
    });
  }
  
}
module.exports = new servicoController();
