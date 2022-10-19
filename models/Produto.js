const pool = require("../database/database.js");

class Produto {
  getCategorias() {
    const sql = "CALL proc_get_categoria()";

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao consultar as categorias!", error);
    }
  }

  getTarja() {
    const sql = "CALL proc_get_tarja()";

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao consultar as tarjas dos medicamentos!", error);
    }
  }

  getLoja() {
    const sql = "CALL proc_get_loja_parceira()";

    try {
      return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
          if (err) rej(err);
          connection.query(sql, (err, rows) => {
            if (err) rej(err);
            else res(rows[0]);
            connection.release();
          });
        });
      });
    } catch (error) {
      throw new Error("Erro ao consultar as lojas parceiras!", error);
    }
  }

  storeProduto(dados) {
    const {idProduto, acao, nome, url, categoria, preco, qtd, nLote, dtLote, loja, descricao, tarja} = dados;

    const sql = "CALL proc_store_produto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [idProduto, acao, nome, qtd, preco, dtLote, descricao, nLote, url, categoria, tarja, loja];

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
      throw new Error("Erro ao cadastrar produto!", error);
    }
  }

  getProdutos(index = false) {
    const sql = "CALL proc_get_produto(?, ?)";
    let values;

    if (index) {
      values = [null, 1];
    } else {
      values = [null, 0];
    }

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
      throw new Error("Erro ao encontrar os produtos!", error);
    }
  }

  getProduto(id) {
    const sql = "CALL proc_get_produto(?, ?)";
    const values = [id, 0];

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
      throw new Error("Erro ao encontrar o produto!", error);
    }
  }
}

module.exports = new Produto();
