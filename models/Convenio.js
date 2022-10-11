const pool = require('../database/database.js');

class Convenio {
    getConvenios() {
        const sql = 'CALL proc_get_convenios;';

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
            throw new Error('Erro ao consultar convênios!', error);
        }
    }
}

module.exports = new Convenio;