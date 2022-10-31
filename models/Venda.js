const pool = require("../database/database.js");

class Venda {
  editPrecoVenda(dados) {
    const {precoFinal, idCliente} = dados;
    const sql = "UPDATE leandromacedo.TB_VENDA SET precoFinal = ? WHERE FK_idCliente = ?";
    const values = [precoFinal, idCliente];

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
      throw new Error("Erro ao editar o preço status da compra!", error);
    }
  }

  getAllVendasCli() {}

  getAllVendas() {}
}

module.exports = new Venda();
