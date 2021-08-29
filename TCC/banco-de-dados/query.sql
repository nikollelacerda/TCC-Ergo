CREATE TABLE usuario
(
	UID SERIAL PRIMARY KEY,
	nome VARCHAR(255),
	pontos INTEGER DEFAULT 0,
	email VARCHAR(255),
	senha VARCHAR(255)
);

CREATE TABLE alongamento
(
	cod_alongamento SERIAL PRIMARY KEY,
	des_alongamento VARCHAR(255),
	img_alongamento VARCHAR(255)
);

CREATE TABLE historico
(
	cod_historico SERIAL PRIMARY KEY,
	data_ DATE,
	fk_usuario SERIAL,
	fk_alongamento SERIAL,
	CONSTRAINT con_fk_usuario 
		FOREIGN KEY (fk_usuario) REFERENCES usuario(UID)
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT con_fk_alongamento 
		FOREIGN KEY (fk_alongamento) REFERENCES alongamento(cod_alongamento)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ciclo_pomodoro
(
	cod_pomodoro SERIAL PRIMARY KEY,
	titulo VARCHAR(255),
	concluido BOOLEAN, 
	duracao TIME,
	fk_usuario SERIAL,
	CONSTRAINT con_fk_usuario 
		FOREIGN KEY (fk_usuario) REFERENCES usuario(UID)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE personagem
(
	cod_personagem SERIAL PRIMARY KEY,
	apelido VARCHAR(255),
	cor_olhos VARCHAR(6),
	cor_pele VARCHAR(6),
	fk_usuario SERIAL,
	CONSTRAINT con_fk_usuario 
		FOREIGN KEY (fk_usuario) REFERENCES usuario(UID)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cosmetico
(
	cod_cosmetico SERIAL PRIMARY KEY,
	tipo VARCHAR(255),
	nome_cosmetico VARCHAR(255),
	img_cosmetico VARCHAR(255)
);

CREATE TABLE inventario(
	cod_inventario SERIAL PRIMARY KEY,
	fk_personagem SERIAL,
	fk_cosmetico SERIAL,
	CONSTRAINT con_fk_personagem 
		FOREIGN KEY (fk_personagem) REFERENCES personagem(cod_personagem)
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT con_fk_cosmetico 
		FOREIGN KEY (fk_cosmetico) REFERENCES cosmetico(cod_cosmetico)
		ON DELETE CASCADE ON UPDATE CASCADE
);

DELETE FROM usuario;
DELETE FROM alongamento;
DELETE FROM historico;
DELETE FROM ciclo_pomodoro;
DELETE FROM personagem;
DELETE FROM cosmetico;
DELETE FROM inventario;

SELECT * FROM usuario;
SELECT * FROM alongamento;
SELECT * FROM historico;
SELECT * FROM ciclo_pomodoro;
SELECT * FROM personagem;
SELECT * FROM cosmetico;
SELECT * FROM inventario;

/*INSERÇÃO DE DADOS*/
INSERT INTO usuario (nome, pontos, email, senha) VALUES 
	('nome1', 100, 'usuario1', 'senha1'),
	('nome2', 2000, 'usuario2', 'senha2'),
	('nome3', 30000, 'usuario3', 'senha3'),
	('nome4', -10, 'usuario4', 'senha4');

INSERT INTO personagem (apelido, cor_olhos, cor_pele, fk_usuario) VALUES
	('personagem1', 'ff0000', 'aaaa55', 1),
	('personagem2', '00ff00', 'bbbb55', 2),
	('personagem3', '0000ff', 'cccc55', 3);

INSERT INTO cosmetico (nome_cosmetico, tipo, img_cosmetico) VALUES
	('Chapéu de Cowboy', 'Cabeça', 'chapeu_cowboy.gif'),
	('Calça de Cowboy', 'Pernas', 'calca_cowboy.png'),
	('Botas de Cowboy', 'Pés', 'botas_cowboy.jpeg'),
	('Óculos Escuros', 'Rosto', 'oculos_escuros.jpeg'),
	('Máscara Cirurgica', 'Rosto', 'mascara_cirurgica.png'),
	('Entrade Erronea', 'Barriga', 'erro.png');

INSERT INTO inventario (fk_personagem, fk_cosmetico) VALUES
	(1, 1), (2, 2), (3, 3);
	
INSERT INTO alongamento(des_alongamento, img_alongamento) VALUES 
	('Lorem ipsum dolor sit amet', 'descrição da img 1'),
	('consectetur adipisicing elit', 'descrição da img 2'),
	('sed do eiusmod', 'descrição da img 3');
	
INSERT INTO historico (data_, fk_usuario, fk_alongamento) VALUES 
	('08/04/2020', 1, 1),
	('07/11/2021', 2, 2),
	('29/11/2019', 3, 3),
	('21/08/2021', 1, 2);

INSERT INTO ciclo_pomodoro (titulo, concluido, duracao, fk_usuario) VALUES
	('Tempor', true, '04:58:00', 1),
	('Nostrud', false, '01:58:00', 2),
	('Cillum', true, '05:00:00', 3),
	('errado', false, '00:00:00', 1);

/*DELEÇÃO DE DADOS*/
DELETE FROM usuario 
	WHERE pontos < 0
	RETURNING *;

DELETE FROM cosmetico
	WHERE tipo NOT IN('Rosto','Cabeça','Pés','Pernas','Torso','Braços','Costas')
	RETURNING *;
	
DELETE FROM historico
	WHERE data_ < '01/01/2021'
	RETURNING *;
	
DELETE FROM ciclo_pomodoro 
	WHERE duracao <= '00:00:00'
	RETURNING *;

/*ATUALIZAÇÂO DE DADOS*/
UPDATE usuario 
	SET nome = 'João da Silva' 
	WHERE UID = 2
	RETURNING *;
	
UPDATE cosmetico 
	SET img_cosmetico = REGEXP_REPLACE(img_cosmetico, '([.])\w+', '.png')
	WHERE img_cosmetico NOT LIKE '%png'
	RETURNING *;

UPDATE cosmetico 
	SET img_cosmetico = 'default.png'
	WHERE EXISTS(SELECT * FROM cosmetico WHERE img_cosmetico = '')
	RETURNING *;

UPDATE alongamento 
	SET des_alongamento = 'Duis aute irure dolor in reprehenderit in voluptate velit esse' 
	WHERE cod_alongamento = 1
	RETURNING *;
	
UPDATE alongamento 
	SET img_alongamento = 'descricao atualizada img 3'
	WHERE cod_alongamento = 3
	RETURNING *;

UPDATE ciclo_pomodoro 
	SET titulo = 'dolore'
	WHERE cod_pomodoro = 2
	RETURNING *;

/*LEITURA DE DADOS*/
SELECT nome_cosmetico as "Itens Cosméticos para a Cabeça e Rosto"
	FROM cosmetico
	WHERE tipo IN('Rosto', 'Cabeça');
	
SELECT nome, email, pontos
	FROM usuario
	WHERE pontos = (SELECT MAX(pontos) FROM usuario);

SELECT us.nome as "Nome do Usuario", cp.titulo as "Titulo do Ciclo", cp.duracao
	FROM ciclo_pomodoro cp
	INNER JOIN usuario us ON cp.fk_usuario = us.UID
	WHERE cp.duracao = (SELECT MAX(duracao) FROM ciclo_pomodoro);
	
SELECT email, COUNT(*) as "Ciclos Concluidos"
	FROM usuario us 
	INNER JOIN ciclo_pomodoro cp ON cp.fk_usuario = us.UID
	WHERE cp.concluido = true OR cp.duracao > '2:00'
	GROUP BY email
	HAVING COUNT(*) > 0;
	
SELECT * 
	FROM ciclo_pomodoro cp 
	WHERE cp.titulo = 'Tempor';

SELECT us.nome as "Nome do Usuario", COUNT(*) as "Cosméticos possuidos"
	FROM inventario iv
	INNER JOIN cosmetico co ON co.cod_cosmetico = iv.fk_cosmetico
	INNER JOIN personagem pe ON pe.cod_personagem = iv.fk_personagem
	INNER JOIN usuario us ON us.UID = pe.fk_usuario
	GROUP BY us.nome
	HAVING COUNT(*) > 0;

SELECT us.nome as "Usuario que mais alongou", COUNT(*) as "Alongamentos Feitos"
	FROM historico hi
	INNER JOIN alongamento al ON al.cod_alongamento = hi.fk_alongamento
	INNER JOIN usuario us ON us.UID = hi.fk_usuario
	GROUP BY us.nome
	ORDER BY COUNT(*) DESC LIMIT 1;

SELECT al.*
	FROM alongamento al
	INNER JOIN historico hi ON hi.fk_alongamento = al.cod_alongamento
	WHERE hi.data_ = (CURRENT_DATE - interval '1 day')

