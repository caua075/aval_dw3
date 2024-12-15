// Importa o módulo node-fetch, que permite realizar requisições HTTP para APIs externas.
import fetch from 'node-fetch';  // Usando import, já que é ESM

// Define a URL base da API que será usada para interagir com os dados dos jogadores.
const API_URL = 'http://localhost:30000/jog';

// Função para obter todos os jogadores
export const getJogadores = async (req, res) => {
  try {
    // Realiza uma requisição GET para a API usando a URL definida.
    const response = await fetch(API_URL, {
      method: 'GET', // Método HTTP para obter dados
      headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
    });
    // Converte a resposta da API para um formato JSON.
    const jogadores = await response.json();
    // Envia os dados dos jogadores como resposta com status HTTP 200 (sucesso).
    res.status(200).json(jogadores);
  } catch (error) {
    // Em caso de erro, exibe o erro no console para depuração.
    console.error('Erro ao buscar jogadores:', error);
    // Retorna uma resposta com status 500 (erro do servidor) e uma mensagem de erro.
    res.status(500).json({ message: 'Erro ao buscar jogadores.' });
  }
};

// Função para inserir um novo jogador
export const insertJogador = async (req, res) => {
  try {
    // Realiza uma requisição POST para a API para adicionar um novo jogador.
    const response = await fetch(API_URL, {
      method: 'POST', // Método HTTP para criar novos dados
      headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
      body: JSON.stringify(req.body), // Converte o corpo da requisição em uma string JSON
    });
    // Converte a resposta da API para um formato JSON.
    const result = await response.json();
    // Envia a resposta com status 201 (criado) e os dados retornados pela API.
    res.status(201).json(result);
  } catch (error) {
    // Em caso de erro, exibe o erro no console para depuração.
    console.error('Erro ao inserir jogador:', error);
    // Retorna uma resposta com status 500 (erro do servidor) e uma mensagem de erro.
    res.status(500).json({ message: 'Erro ao inserir jogador.' });
  }
};

// Função para atualizar um jogador
export const updateJogador = async (req, res) => {
  try {
    // Realiza uma requisição PUT para atualizar os dados de um jogador específico.
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'PUT', // Método HTTP para atualizar dados
      headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
      body: JSON.stringify(req.body), // Converte o corpo da requisição em uma string JSON
    });
    // Converte a resposta da API para um formato JSON.
    const result = await response.json();
    // Envia a resposta com status 200 (sucesso) e os dados atualizados.
    res.status(200).json(result);
  } catch (error) {
    // Em caso de erro, exibe o erro no console para depuração.
    console.error('Erro ao atualizar jogador:', error);
    // Retorna uma resposta com status 500 (erro do servidor) e uma mensagem de erro.
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
};

// Função para remover logicamente um jogador (soft delete)
export const deleteJogador = async (req, res) => {
  try {
    // Realiza uma requisição DELETE para remover um jogador específico.
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'DELETE', // Método HTTP para deletar dados
      headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
    });
    // Converte a resposta da API para um formato JSON.
    const result = await response.json();
    // Envia a resposta com status 200 (sucesso) e os dados confirmando a remoção.
    res.status(200).json(result);
  } catch (error) {
    // Em caso de erro, exibe o erro no console para depuração.
    console.error('Erro ao remover jogador:', error);
    // Retorna uma resposta com status 500 (erro do servidor) e uma mensagem de erro.
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
};

// Agrupa todas as funções em um objeto para exportação.
const jogadoresController = {
  getJogadores, // Função para buscar jogadores
  insertJogador, // Função para inserir jogadores
  updateJogador, // Função para atualizar jogadores
  deleteJogador, // Função para deletar jogadores
};

// Exporta o controlador como o padrão para ser usado em outras partes do projeto.
export default jogadoresController;
