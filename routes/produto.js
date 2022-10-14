const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/ProdutoController");
router.get("/produto", produtoController.renderCadastroProduto);
router.post("/produto", produtoController.storeProduto);
router.get("/produtos", produtoController.getProdutos);
router.get("/produto/detalhes/:id", produtoController.getProduto);

module.exports = router;
