const fetch = require('node-fetch');

const API_URL = 'http://localhost:3000/api/jogadores';

// Obtém todos os jogadores
exports.getJogadores = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jogadores = await response.json();
    res.status(200).json(jogadores);
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    res.status(500).json({ message: 'Erro ao buscar jogadores.' });
  }
};

// Insere um novo jogador
exports.insertJogador = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao inserir jogador:', error);
    res.status(500).json({ message: 'Erro ao inserir jogador.' });
  }
};

// Atualiza um jogador
exports.updateJogador = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
};

// Remove logicamente um jogador
exports.deleteJogador = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao remover jogador:', error);
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
};
