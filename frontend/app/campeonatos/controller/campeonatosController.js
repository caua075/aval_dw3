import fetch from 'node-fetch';  // Usando import, já que é ESM

const API_URL = 'http://localhost:30000/jog';

// Função para obter todos os campeonatos
export const getCampeonatos = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const campeonatos = await response.json();
    res.status(200).json(times);
  } catch (error) {
    console.error('Erro ao buscar os campeonatos:', error);
    res.status(500).json({ message: 'Erro ao buscar os campeonatos.' });
  }
};

// Função para inserir um novo campeonato
export const insertCampeonatos = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao inserir o campeonato:', error);
    res.status(500).json({ message: 'Erro ao inserir o campeonato.' });
  }
};

// Função para atualizar um campeonato
export const updateCampeonato = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar o campeonato:', error);
    res.status(500).json({ message: 'Erro ao atualizar o campeonato.' });
  }
};

// Função para remover logicamente um campeonato (soft delete)
export const deleteCampeonato = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao remover o campeonato:', error);
    res.status(500).json({ message: 'Erro ao remover o campeonato.' });
  }
};

const campeonatosController = {
  getCampeonatos,
  insertCampeonatos,
  updateCampeonato,
  deleteCampeonato,
};

export default campeonatosController;