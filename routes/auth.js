const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const funcionarioController = require("../controllers/FuncionarioController.js");

router.get("/login", authController.getLogin);
router.get("/cadastro", authController.getCadastro);
router.get("/recuperacao-senha", authController.renderRecuperacao);
router.post("/recuperacao-senha", authController.disparaEmail);
router.post("/recuperacao-senha/verificacao", authController.verificaCodVerificacao);
router.post("/alteracao-senha", authController.updateSenha);
router.get("/logoff", authController.logoff);

router.get("/funcionario/logoff", funcionarioController.logoff);

module.exports = router;
