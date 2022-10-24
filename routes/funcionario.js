const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/FuncionarioController.js");

router.get("/funcionario", funcionarioController.renderCadastro);
router.post("/funcionario", funcionarioController.storeFuncionario);
router.get("/funcionario/:id", funcionarioController.getFuncionario);

router.get("/pesquisa", funcionarioController.procurarUsuario);
router.post("/pesquisa", funcionarioController.pesquisaUsuario);

router.get("/solicitacoes", funcionarioController.getSolicitacoes);
router.get("/cupons", funcionarioController.getCupons);
router.get("/entregas", funcionarioController.getEntregas);


router.get("/solicitacao/:solicitacaoId", funcionarioController.getSolicitacao);

module.exports = router;
