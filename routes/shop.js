const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.js");

router.get("/servico/agendamento", shopController.renderAgendamento);
router.get("/enviar-parcerias", shopController.getEnviarParcerias);
router.get("/produto/:produtoId", shopController.getProduto);
router.get("/servico/:servicoId", shopController.getServico);
router.get("/", shopController.getIndex);

module.exports = router;
