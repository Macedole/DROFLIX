const express = require("express");
const router = express.Router();
const authCliente = require("../middlewares/authCliente");
const authFuncionario = require("../middlewares/authFuncionario");
const VendaController = require("../controllers/VendaController");

router.get("/venda", authCliente, VendaController.renderConfirmacao);
router.get("/finalizacao", authCliente, VendaController.confirmaCompra);
router.get("/minhas-compras", authCliente, VendaController.renderVendasCli);
router.get("/vendas", authFuncionario, VendaController.renderAllVendas);

module.exports = router;
