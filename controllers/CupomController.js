const modelCupom = require("../models/Cupom.js");
const modelProduto = require("../models/Produto.js");

const formatDate = require("../public/assets/utils/formatDate.js");

class CupomController {
    async renderCupons(req, res) {
        const cupons = await modelCupom.getCupons();

        cupons.forEach(cupom => {
            cupom.data_cadastro = formatDate(cupom.data_cadastro);
        });

        const categorias = await modelProduto.getCategorias();

        res.render("admin/cupons", {
            cupons,
            categorias,
            paginaTitulo: "Cupons de desconto"
          });
    }

    async store(req, res) {
        const { codigo, desconto, idCategoria } = req.body;

        const existeCupom = await modelCupom.getCupom({ idCategoria, codigo });

        if(existeCupom.length > 0) {
            return res.json({ mensagem: 'Já existe um cupom ativo com esse código!', erro: true });
        }

        let descontoFormatado = desconto.replace('%', '');
        descontoFormatado = descontoFormatado / 100;

        const cupom = await modelCupom.storeCupom({ 
            codigo: codigo.toUpperCase(), 
            idCategoria, 
            desconto: descontoFormatado, 
            idFuncionario: req.idFuncionario
        });

        return res.json({
            erro: false,
            mensagem: cupom[0].mensagem
        });
    }

    async ativarDesativar (req, res) {
        const { idCupom, acao } = req.body;

        const cupom = await modelCupom.ativarDesativarCupom(idCupom, acao);

        return res.json({
            erro: false,
            mensagem: cupom[0].mensagem
        });
    }
}

module.exports = new CupomController;