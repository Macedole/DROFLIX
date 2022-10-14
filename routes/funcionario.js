const express = require("express");
const {renderCadastroServico} = require("../controllers/FuncionarioController.js");
const router = express.Router();

const funcionarioController = require("../controllers/FuncionarioController.js");

router.get("/funcionario", funcionarioController.renderCadastro);
router.post("/funcionario", funcionarioController.storeFuncionario);
router.get("/funcionario/:id", funcionarioController.getFuncionario);

router.get("/procurar-usuario", funcionarioController.procurarUsuario);
router.get("/solicitacoes", funcionarioController.getSolicitacoes);
router.get("/cupons", funcionarioController.getCupons);
router.get("/entregas", funcionarioController.getEntregas);

router.get("/cadastrar-servico", funcionarioController.renderCadastroServico);
router.get("/solicitacao/:solicitacaoId", funcionarioController.getSolicitacao);

module.exports = router;
