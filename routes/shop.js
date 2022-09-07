const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.js");

router.get("/enviar-parcerias", shopController.getEnviarParcerias);
router.get("/", shopController.getIndex);

module.exports = router;
