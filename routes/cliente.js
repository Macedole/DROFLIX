const express = require("express");

const router = express.Router();

const ClienteController = require("../controllers/ClienteController.js");

router.get("/cliente", ClienteController.renderCadastro);
router.post("/cliente", ClienteController.storeCustomer);
router.get("/cliente/:id", ClienteController.getCustomer); 




module.exports = router;
