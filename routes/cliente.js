const express = require("express");

const router = express.Router();

const ClienteController = require("../controllers/ClienteController.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/cliente", ClienteController.renderCadastro);
router.post("/cliente/login", ClienteController.getCustomerLogin);

router.use(authMiddleware);

router.post("/cliente", ClienteController.storeCustomer);
router.get("/cliente/:id", ClienteController.getCustomer); 

module.exports = router;
