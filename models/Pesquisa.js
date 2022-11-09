const pool = require("../database/database");

class Pesquisa{

    getPesquisas(palavra){
        const sql = 'CALL proc_get_pesquisa(?)';
        const value = [palavra];

        console.log(value + "  chegou no model");
        try{
            return new Promise((res,rej)=>{
                pool.getConnection((err, connection) => {
                    if(err) rej(err);
                    connection.query(sql, value, (err, rows) =>{
                        if(err) rej(err);
                        else res(rows);
                        connection.release();
                    });
                });
            });
        } catch (error){
            throw new Error("Erro ao efetuar sua pesquisa!", error);
        }
    }

}

module.exports = new Pesquisa();