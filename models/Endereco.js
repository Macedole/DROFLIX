const pool = require('../database/database.js');

class Endereco {
    storeEndereco(dados) {
        const {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf
        } = dados;

        const sql = 'CALL proc_store_endereco (?, ?, ?, ?, ?, ?, ?)';
        const values = [logradouro, numero, bairro, cidade, uf, cep, complemento];

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
            throw new Error('Erro ao cadastrar o endereço!', error);
        }
    }

    getEndereco(dados){
        const {
            cep,
            numero
        } = dados;

        const sql = 'CALL proc_get_endereco(?, ?)';
        const values = [cep, numero];

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
            throw new Error('Erro ao consultar endereço!', error);
        }
    }
}

module.exports = new Endereco;