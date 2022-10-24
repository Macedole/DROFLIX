const pool = require("../database/database.js");

class Servico{
    storeServico(dados){
        const  {titulo, duracao, agenda, preco, descricao, url} = dados; 

        const sql = "CALL proc_store_servico( ?, ?, ?, ?, ?, ?)";
        const values = [ titulo, duracao, agenda, preco, descricao, url ];

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
            throw new Error("Erro ao cadastrar serviço!", error);
        }
    }
}

module.exports = new Servico();