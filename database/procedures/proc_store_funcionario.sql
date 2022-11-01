DELIMITER $$

CREATE PROCEDURE proc_store_funcionario (
	IN cpf VARCHAR(11),
	IN nome VARCHAR(60),
	IN email VARCHAR(40),
	IN dataNasc DATE,
	IN telefone VARCHAR(11),
	IN cargo VARCHAR(50),
	IN id_endereco INT,
	IN id_departamento INT
)

BEGIN

	INSERT INTO tb_funcionario (cpf, nome, email, dataNasc, telefone, cargo, FK_idEndereco, FK_idDepartamento)
	VALUES (cpf, nome, email, dataNasc, telefone, cargo, id_endereco, id_departamento);
	
	SELECT
		PK_idFuncionario AS id_funcionario,
		'Funcionário cadastrado com sucesso!' AS message
	FROM
		tb_funcionario f
	WHERE
		f.cpf = cpf;

END $$