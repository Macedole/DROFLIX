const express = require("express");
const router = express.Router();

const funcionarioController = require("../controllers/FuncionarioController.js");

router.get('/funcionario', funcionarioController.renderCadastro);
router.post('/funcionario', funcionarioController.storeFuncionario);

module.exports = router;