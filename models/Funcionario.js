const pool = require('../database/database.js');

class Funcionario {
    getFuncionario(dados) {
        const {
            campo,
            valor
        } = dados;

        let sql = '';
        
        if(campo === 'id') {
            sql = 'CALL proc_get_funcionario (?, null, null)';
        } else if(campo === 'email') {
            sql = 'CALL proc_get_funcionario (null, ?, null)';
        }else {
            sql = 'CALL proc_get_funcionario (null, null, ?)';
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
            throw new Error('Erro ao cadastrar o funcionário!', error);
        }
    }

    storeFuncionario(dados) {
        const {
            cpf, 
            nome, 
            email, 
            dataNasc, 
            telefone, 
            cargo,
            salario,
            idEndereco, 
            idDepartamento
        } = dados;

        const sql = 'CALL proc_store_funcionario (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [cpf, nome, email, dataNasc, telefone, cargo, salario, idEndereco, idDepartamento];

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
            throw new Error('Erro ao cadastrar o funcionário!', error);
        }
    }
}

module.exports = new Funcionario;