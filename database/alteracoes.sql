ALTER TABLE tb_endereco
RENAME COLUMN PK_idEnderco TO PK_idEndereco;

ALTER TABLE tb_funcionario
RENAME COLUMN FK_idEnderco TO FK_idEndereco;

ALTER TABLE tb_endereco
ADD COLUMN logradouro VARCHAR(60) NOT NULL AFTER PK_idEndereco;

ALTER TABLE tb_endereco
ADD COLUMN numero VARCHAR(10) NOT NULL AFTER logradouro;

ALTER TABLE tb_endereco
ADD COLUMN bairro VARCHAR(60) NOT NULL AFTER numero;