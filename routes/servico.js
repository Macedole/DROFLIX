const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const shopController = require("../controllers/shop.js");
const auth = require("../middlewares/authFuncionario");


router.get("/servico", auth, servicoController.renderCadastroServico);
router.post("/servico", auth, servicoController.storeServico);
router.get("/servicos/:id", auth, servicoController.getServicos);
router.get("/servico/:servicoId", shopController.getServico);
module.exports = router;