const pool = require('../database/database.js');

class Cliente{
    storeCustomer(dados){
        const {
            acao,
            cpf, 
            nome,
            email, 
            dataNasc, 
            telefone, 
            receberNotificacao,
            senha,
            idEndereco,
            idConvenio
        } = dados;
        
        const sql = 'CALL proc_store_customer(?,?,?,?,?,?,?,?,?,?)';
        const values = [acao, cpf, nome, email, dataNasc, telefone, receberNotificacao, senha, idEndereco, idConvenio];

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
            throw new Error('Erro ao cadastrar o Cliente!', error);
        }
    }

    getCustomer(dados) {
        const {
            campo,
            valor
        } = dados;

        let sql = '';
        
        if(campo === 'id') {
            sql = 'CALL proc_get_customer (?, null, null)';
        } else if(campo === 'email') {
            sql = 'CALL proc_get_customer (null, ?, null)';
        }else {
            sql = 'CALL proc_get_customer (null, null, ?)';
        }

        const values = [valor];

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
            throw new Error('Erro ao buscar o Cliente!', error);
        }
    }
}

module.exports = new Cliente;