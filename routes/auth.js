const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.get("/cadastro", authController.getCadastro);
router.get("/recuperacao-senha", authController.renderRecuperacao);
router.post("/recuperacao-senha", authController.disparaEmail);
router.post("/recuperacao-senha/verificacao", authController.verificaCodVerificacao);
router.post("/alteracao-senha", authController.updateSenha);

module.exports = router;
