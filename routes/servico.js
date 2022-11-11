const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const shopController = require("../controllers/shop.js");
const authFuncionario = require("../middlewares/authFuncionario");
const authCliente = require("../middlewares/authCliente");

// cadastrar o serviço
router.get("/servico", authFuncionario, servicoController.renderCadastroServico);
router.post("/servico", authFuncionario, servicoController.storeServico);
// exibir o serviço para o funcionário
router.get("/servicos/:id", authFuncionario, servicoController.getServicos);
// fazer agendamento do serviço
router.get("/servico/agendamento", authCliente, servicoController.renderAgendamento);
router.post("/servico/agendamento", authCliente, servicoController.storeAgendamento);
// exibir serviço para o cliente
router.get("/servico/:id", servicoController.getServico);
router.get("/agendamento", servicoController.listarAgendamento);
module.exports = router;
