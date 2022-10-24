const modelServico = require("../models/Servico");

class servicoController{
    async renderCadastroServico(req, res) {
        res.render("admin/cadastrar-servico", {
            paginaTitulo: "Cadastrar serviço",
            isAdmin: true,
        });
    }

    async storeServico(req, res){
        const {titulo, duracao, agenda, preco, descricao, url} = req.body;

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
        }else if(!agenda){
            mensagem = 'houve um erro no Necessita de agendamento';
        }

        if (mensagem !== "") {
            return res.json({mensagem, erro: true});
        }

        const precoFormatado = preco.replace(",", ".");
        const duracaoFormatado = duracao.replace(":", ".");


        let servico = await modelServico.storeServico({
            titulo,
            duracao : duracaoFormatado, 
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
}


module.exports = new servicoController();