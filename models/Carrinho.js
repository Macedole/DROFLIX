const pool = require("../database/database.js");

class Carrinho {
  criarCarrinho(dados) {
    const {data, preco, desconto, idCliente, idStatus} = dados;
    const sql = "INSERT INTO leandromacedo.TB_VENDA (dataVenda, precoFinal, desconto, FK_idCliente, FK_idStatus) VALUES (?, ?, ?, ?, ?);";
    const values = [data, preco, desconto, idCliente, idStatus];

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, values, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao criar o carrinho!", error);
    }
  }

  getVenda(idCliente) {
    const sql = "SELECT * FROM leandromacedo.TB_VENDA WHERE FK_idCliente = ? AND FK_idStatus = ?";
    const values = [idCliente, 3];

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, values, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao encontrar o carrinho!", error);
    }
  }

  getVendaProdutos(idCarrinho) {
    const sql = "SELECT * FROM leandromacedo.TB_VENDA_PRODUTO WHERE FK_idVenda = ?";
    const value = idCarrinho;

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, value, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao encontrar o carrinho!", error);
    }
  }

  getProdutosCarrinho(idVenda) {
    //const sql = "SELECT * FROM leandromacedo.TB_PRODUTO WHERE PK_idProduto IN ( SELECT FK_idProduto FROM leandromacedo.TB_VENDA_PRODUTO WHERE FK_idVenda = ?)";
    const sql = `SELECT *, COUNT(p.PK_idProduto) AS quantidade
      FROM TB_PRODUTO p
      INNER JOIN TB_VENDA_PRODUTO v ON p.PK_idProduto = v.FK_idProduto
      WHERE v.FK_idVenda = ?
      GROUP BY v.FK_idProduto`
    const value = idVenda;

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, value, (err, rows) => {
            if (err) rej(err);
            else res(rows);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao encontrar os produtos!", error);
    }
  }

  adicionaCarrinho(dados) {
    const {idProduto, idVenda, descontoProduto} = dados;
    const sql = "INSERT INTO leandromacedo.TB_VENDA_PRODUTO (FK_idProduto, FK_idVenda, descontoProduto) VALUES (?, ?, ?);";
    const values = [idProduto, idVenda, descontoProduto];

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, values, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao encontrar o carrinho!", error);
    }
  }

  removerCarrinho(idProduto, idVenda) {
    // const sql = "DELETE FROM leandromacedo.TB_VENDA_PRODUTO WHERE FK_idProduto = ? AND FK_idVenda = ?;";
    const sql = "CALL proc_remove_produtos_carrinho(?, ?);";
    const values = [idVenda, idProduto];

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, values, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao remover produto do carrinho!", error);
    }
  }
}

module.exports = new Carrinho();
