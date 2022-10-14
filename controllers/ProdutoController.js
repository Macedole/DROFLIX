const modelProduto = require("../models/Produto.js");

class ProdutoController{
    async renderCadastroProduto(req, res) {
        const categorias = await modelProduto.getCategorias();
        const tarja = await modelProduto.getTarja();
        const loja = await modelProduto.getLoja();

        res.render("admin/cadastrar-produto", {
            paginaTitulo: "Cadastro de produto",
            isLoggedIn: true,
            isAdmin: true,
            categorias,
            tarja,
            loja,
            acao: 'P'
        });
    }

    async storeProduto(req,res){
        const{acao, nome, url, categoria, tarja, preco, qtd, nLote, dtLote, descricao, loja} = req.body
        let mensagem = ""
        if(nome ==""){
            mensagem = "Preencha o nome corretamente!";
        }else if(!url) {
            mensagem = 'Informe o nome da imagem!';
        }else if(categoria == 0) {
            mensagem = 'Informe a categoria do produto!';
        }else if(!preco) {
            mensagem = 'Informe o preço do produto!';
        }else if(!qtd) {
            mensagem = 'Informe a quantidade de produtos do lote!';
        }else if(!nLote) {
            mensagem = 'Informe o número de identificação do lote!';
        }else if(!dtLote) {
            mensagem = 'Informe a data de vencimento do lote!';
        }else if(!descricao) {
            mensagem = 'Informe uma descrição!';
        }else if(categoria == 1){
            if(tarja == 0){
                mensagem = 'Informe a classificação da tarja do medicamento!';
            }
        }else if(loja == 0){
            mensagem = 'Informe a loja responsável!!'
        }

        if (mensagem !== "") {
            return res.json({mensagem, erro: true});
        }

        const precoFormatado = preco.replace(",", ".");
        let dataLoteFormatada = dtLote.split("/");
        dataLoteFormatada = `${dataLoteFormatada[2]}-${dataLoteFormatada[1]}-${dataLoteFormatada[0]}`;



        let produto = await modelProduto.storeProduto({
            idProduto:  1,
            acao,
            nome,
            url,
            categoria,
            preco: precoFormatado,
            qtd,
            nLote,
            dtLote: dataLoteFormatada,
            loja,
            descricao,
            tarja
        });

        return res.json({
            erro: false,
            idProduto: produto[0].id_produto,
            mensagem: produto[0].mensagem
        });
        
    }
}

module.exports = new ProdutoController();