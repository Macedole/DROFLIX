const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authCliente");
const VendaController = require("../controllers/VendaController");

router.get("/venda", auth, VendaController.renderConfirmacao);
router.get("/finalizacao", auth, VendaController.confirmaCompra);

module.exports = router;
