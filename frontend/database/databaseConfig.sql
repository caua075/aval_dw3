-- Criação do banco
CREATE DATABASE bd_futebol;
\c bd_futebol;

-- Tabela Times
CREATE TABLE IF NOT EXISTS  times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL,
    orcamento DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela Jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE,
    time_id INT REFERENCES times(id) ON DELETE SET NULL
);

-- Tabela Campeonatos
CREATE TABLE IF NOT EXISTS campeonatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    premio DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela Associativa TimesCampeonatos (M:N)
CREATE TABLE IF NOT EXISTS times_campeonatos (
    id SERIAL PRIMARY KEY,
    time_id INT REFERENCES times(id) ON DELETE CASCADE,
    campeonato_id INT REFERENCES campeonatos(id) ON DELETE CASCADE
);

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;