const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/FuncionarioController.js");

const auth = require("../middlewares/authFuncionario");

router.get("/funcionario/login", funcionarioController.renderLogin);
router.post("/funcionario/login", funcionarioController.getFuncionarioLogin);
router.get("/funcionario", auth, funcionarioController.renderCadastro);
router.post("/funcionario", auth, funcionarioController.storeFuncionario);
router.get("/funcionario/:id", auth, funcionarioController.getFuncionario);

router.get("/pesquisa", auth, funcionarioController.procurarUsuario);
router.post("/pesquisa", auth, funcionarioController.pesquisaUsuario);

router.get("/solicitacoes", funcionarioController.getSolicitacoes);
router.get("/entregas", funcionarioController.getEntregas);

router.get("/solicitacao/:solicitacaoId", funcionarioController.getSolicitacao);

module.exports = router;
