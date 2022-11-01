const pool = require("../database/database.js");

class Venda {
  editPrecoVenda(dados) {
    const {precoFinal, dataVenda, idCliente} = dados;
    const sql = "UPDATE leandromacedo.TB_VENDA SET precoFinal = ?, dataVenda = ? WHERE FK_idCliente = ?";
    const values = [precoFinal, dataVenda, idCliente];

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
      throw new Error("Erro ao editar o preço final da compra!", error);
    }
  }

  editStatusVenda(dados) {
    const {status, idCliente} = dados;
    const sql = "UPDATE leandromacedo.TB_VENDA SET FK_idStatus = ? WHERE FK_idCliente = ?";
    const values = [status, idCliente];

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
      throw new Error("Erro ao editar o status da compra!", error);
    }
  }

  getComprasCli(clienteId) {
    const sql = `
      SELECT * FROM leandromacedo.TB_PRODUTO WHERE PK_idProduto IN (
        SELECT FK_idProduto FROM TB_VENDA_PRODUTO WHERE FK_idVenda IN (
          SELECT PK_idVenda FROM TB_VENDA WHERE FK_idCliente = ? AND FK_idStatus = ?
          )
      )
    `;
    const values = [clienteId, 2];

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, values, (err, rows) => {
            if (err) rej(err);
            else res(rows);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao buscar os produtos das compras do cliente editar !", error);
    }
  }

  getAllVendas() {
    const sql = `
    SELECT * FROM leandromacedo.TB_PRODUTO WHERE PK_idProduto IN (
      SELECT FK_idProduto FROM TB_VENDA_PRODUTO WHERE FK_idVenda IN (
        SELECT PK_idVenda FROM TB_VENDA WHERE FK_idStatus = ?
        )
    )
  `;
    const value = 2;

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
      throw new Error("Erro ao buscar os produtos das compras do cliente editar !", error);
    }
  }
}

module.exports = new Venda();
