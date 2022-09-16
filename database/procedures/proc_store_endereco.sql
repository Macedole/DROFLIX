DELIMITER $$

CREATE PROCEDURE proc_store_endereco(
	IN logradouro VARCHAR(60),
	IN numero VARCHAR(10),
	IN bairro VARCHAR(60),
	IN cidade VARCHAR(60),
	IN uf CHAR(2),
	IN cep VARCHAR(8),
	IN complemento VARCHAR(50)
)

BEGIN

	INSERT INTO tb_endereco (logradouro, numero, bairro, cidade, uf, cep, complemento)
	VALUES(logradouro, numero, bairro, cidade, uf, cep, complemento);
	
	SELECT 
		e.PK_idEndereco 
	FROM 
		tb_endereco e
	WHERE 
		e.cep = cep AND
		e.numero = numero;

END $$