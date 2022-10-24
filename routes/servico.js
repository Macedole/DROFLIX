const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");


router.get("/servico", servicoController.renderCadastroServico);
router.post("/servico", servicoController.storeServico);

module.exports = router;