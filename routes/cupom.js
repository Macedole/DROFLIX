const express = require("express");
const router = express.Router();

const cupomController = require("../controllers/CupomController.js");
const auth = require("../middlewares/authFuncionario");

router.get("/cupons", auth, cupomController.renderCupons);
router.post("/cupom", auth, cupomController.store);
router.patch("/cupom", auth, cupomController.ativarDesativar);

module.exports = router;