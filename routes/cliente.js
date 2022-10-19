const express = require("express");

const router = express.Router();

const ClienteController = require("../controllers/ClienteController.js");
const auth = require("../middlewares/auth.js");

router.get("/cliente", ClienteController.renderCadastro);
router.post("/cliente/login", ClienteController.getCustomerLogin);
router.post("/cliente", ClienteController.storeCustomer);
router.get("/cliente/:id", auth, ClienteController.getCustomer);

module.exports = router;
