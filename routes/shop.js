const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.js");

router.get("/enviar-parcerias", shopController.getEnviarParcerias);
router.get("/", shopController.getIndex);
router.post("/search", shopController.getPesquisa);

module.exports = router;
