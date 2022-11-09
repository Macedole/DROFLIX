const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const shopController = require("../controllers/shop.js");

router.get("/servico/agendamento", servicoController.renderAgendamento);
router.get("/enviar-parcerias", shopController.getEnviarParcerias);
router.get("/", shopController.getIndex);
router.post("/search", shopController.getPesquisa );

module.exports = router;
