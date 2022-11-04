const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const shopController = require("../controllers/shop.js");
const authFuncionario = require("../middlewares/authFuncionario");
const authCliente = require("../middlewares/authCliente");


router.get("/servico", authFuncionario, servicoController.renderCadastroServico);
router.post("/servico", authFuncionario, servicoController.storeServico);
router.get("/servicos/:id", authFuncionario, servicoController.getServicos);
router.post("/servico/agendamento", authCliente, servicoController.storeAgendamento);
router.get("/servico/:servicoId", shopController.getServico);
module.exports = router;