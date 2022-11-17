const pool = require('../database/database.js');

class Cupom {
    getCupom(dados) {
        const { idCategoria, codigo } = dados;

        const sql = 'CALL proc_get_cupom(?, ?);';
        const values = [idCategoria, codigo];

        try {
            return new Promise((res, rej) => {
                pool.getConnection((err, connection) => {
                    if(err)
                        rej(err);
                    connection.query(sql, values, (err, rows) => {
                        if(err)
                            rej(err);
                        else
                            res(rows[0]);
                        connection.release();
                    });
                });
            });
        } catch (error) {
            throw new Error('Erro ao pesquisar o cupom!', error);
        }
    }

    getCupons() {
        const sql = 'CALL proc_get_cupons;';

        try {
            return new Promise((res, rej) => {
                pool.getConnection((err, connection) => {
                    if(err)
                        rej(err);
                    connection.query(sql, (err, rows) => {
                        if(err)
                            rej(err);
                        else
                            res(rows[0]);
                        connection.release();
                    });
                });
            });
        } catch (error) {
            throw new Error('Erro ao pesquisar os cupons!', error);
        }
    }

    getCupomCarrinho(dados) {
        const { codigo } = dados;

        const sql = 'CALL proc_get_cupom_codigo(?);';
        const values = [codigo];

        try {
            return new Promise((res, rej) => {
                pool.getConnection((err, connection) => {
                    if(err)
                        rej(err);
                    connection.query(sql, values, (err, rows) => {
                        if(err)
                            rej(err);
                        else
                            res(rows[0]);
                        connection.release();
                    });
                });
            });
        } catch (error) {
            throw new Error('Erro ao pesquisar o cupom!', error);
        }
    }

    storeCupom(dados) {
        const { codigo, idCategoria, desconto, idFuncionario } = dados;

        const sql = 'CALL proc_store_cupom (?, ?, ?, ?)';
        const values = [codigo, idCategoria, desconto, idFuncionario];

        try {
            return new Promise((res, rej) => {
                pool.getConnection((err, connection) => {
                    if(err)
                        rej(err);
                    connection.query(sql, values, (err, rows) => {
                        if(err)
                            rej(err);
                        else
                            res(rows[0]);
                        connection.release();
                    });
                });
            });
        } catch (error) {
            throw new Error('Erro ao cadastrar o cupom!', error);
        }
    }

    ativarDesativarCupom(idCupom, acao) {
        const sql = 'CALL proc_update_cupom (?, ?);';
        const values = [idCupom, acao];

        try {
            return new Promise((res, rej) => {
                pool.getConnection((err, connection) => {
                    if(err)
                        rej(err);
                    connection.query(sql, values, (err, rows) => {
                        if(err)
                            rej(err);
                        else
                            res(rows[0]);
                        connection.release();
                    });
                });
            });
        } catch (error) {
            throw new Error('Erro ao desativar o cupom!', error);
        }
    }
}

module.exports = new Cupom;