const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");


router.get("/servico", servicoController.renderCadastroServico);
router.post("/servico", servicoController.storeServico);
router.get("/servicos/:id", servicoController.getServicos);

module.exports = router;