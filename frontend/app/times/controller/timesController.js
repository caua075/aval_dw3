import fetch from 'node-fetch';  // Usando import, já que é ESM

const API_URL = 'http://localhost:30000/jog';

// Função para obter todos os times
export const getTimes = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const times = await response.json();
    res.status(200).json(times);
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    res.status(500).json({ message: 'Erro ao buscar times.' });
  }
};

// Função para inserir um novo time
export const insertTime = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao inserir time:', error);
    res.status(500).json({ message: 'Erro ao inserir time.' });
  }
};

// Função para atualizar um time
export const updateTime = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar time:', error);
    res.status(500).json({ message: 'Erro ao atualizar time.' });
  }
};

// Função para remover logicamente um time (soft delete)
export const deleteTime = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao remover time:', error);
    res.status(500).json({ message: 'Erro ao remover time.' });
  }
};

const timesController = {
  getTimes,
  insertTime,
  updateTime,
  deleteTime
};

export default timesController;