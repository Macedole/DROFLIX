const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/ProdutoController");
router.get("/produto", produtoController.renderCadastroProduto);
router.post("/produto", produtoController.storeProduto);
//router.get("/produto/:id", produtoController.getFuncionario);


module.exports = router