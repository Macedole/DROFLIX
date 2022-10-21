const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/CarrinhoController");
const auth = require("../middlewares/auth");

router.get("/carrinho", auth, carrinhoController.renderCarrinho);
router.post("/post-carrinho", auth, carrinhoController.postCarrinho);
router.post("/delete-cart", auth, carrinhoController.deleteCarrinho);

module.exports = router;
