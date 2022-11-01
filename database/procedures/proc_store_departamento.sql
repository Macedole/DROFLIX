DELIMITER $$

CREATE PROCEDURE proc_store_departamento (
	IN nome VARCHAR(50)
)

BEGIN
	
	INSERT INTO tb_departamento (nome)
	VALUES (nome);
	
	SELECT 'Departamento cadastrado com sucesso' AS message;
	
END $$