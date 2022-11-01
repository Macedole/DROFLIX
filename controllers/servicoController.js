const modelServico = require("../models/Servico");

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

  async storeServico(req, res){
    const {servicoId, acao, titulo, duracao, agenda, preco, descricao, url} = req.body;

    let mensagem = "";

    if(titulo ==""){
        mensagem = "Preencha o titulo corretamente!";
    }else if(!url) {
        mensagem = 'Informe a url da imagem!';
    }else if(!duracao) {
        mensagem = 'Informe a duração do serviço!';
    }else if(!preco) {
        mensagem = 'Informe o preço do serviço!';
    }else if(!descricao) {
        mensagem = 'Informe uma breve descrição do serviço!';
    }
    
    if (mensagem !== "") {
        return res.json({mensagem, erro: true});
    }

    const precoFormatado = preco.replace(",", ".");

    let servico = await modelServico.getServico(
      servicoId
    );

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

  async getServicos(req,res){
    const {id} = req.params;
    const servico = await modelServico.getServico(id);
    res.render("admin/cadastrar-servico",{
      paginaTitulo: "Cadastrar serviço",
      isAdmin: true,
      servico: servico[0],
      acao: "U",
    });
  }
}
module.exports = new servicoController();