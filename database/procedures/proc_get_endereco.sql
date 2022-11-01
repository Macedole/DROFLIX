DELIMITER $$

CREATE PROCEDURE proc_get_endereco (
	IN cep VARCHAR(8),
	IN numero VARCHAR(10)
)

BEGIN
	
	SELECT
		e.PK_idEndereco AS id_endereco
	FROM 
		tb_endereco e
	WHERE 
		e.cep = cep AND
		e.numero = numero;
	
END $$