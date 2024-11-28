-- Criação do banco
CREATE DATABASE bd_futebol;

-- Tabela Jogadores
CREATE TABLE jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE,
    time_id INT REFERENCES times(id) ON DELETE SET NULL
);

-- Tabela Times
CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL,
    orcamento DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela Campeonatos
CREATE TABLE campeonatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    premio DECIMAL(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela Associativa TimesCampeonatos (M:N)
CREATE TABLE times_campeonatos (
    id SERIAL PRIMARY KEY,
    time_id INT REFERENCES times(id) ON DELETE CASCADE,
    campeonato_id INT REFERENCES campeonatos(id) ON DELETE CASCADE
);