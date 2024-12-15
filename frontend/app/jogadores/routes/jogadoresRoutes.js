import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para simular __dirname
import jogadoresController from '../controller/jogadoresController.js';

// Usando fileURLToPath para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Página de jogadores
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/html/jogadores.html'));
});

// API para listar jogadores
router.get('/api', async (req, res) => {
  try {
    await jogadoresController.getJogadores(req, res);
  } catch (error) {
    console.error('Erro na rota GET /api:', error);
    res.status(500).json({ message: 'Erro ao listar jogadores.' });
  }
});

// API para adicionar jogador
router.post('/api', async (req, res) => {
  try {
    await jogadoresController.insertJogador(req, res);
  } catch (error) {
    console.error('Erro na rota POST /api:', error);
    res.status(500).json({ message: 'Erro ao adicionar jogador.' });
  }
});

// API para editar jogador
router.put('/api/:id', async (req, res) => {
  try {
    await jogadoresController.updateJogador(req, res);
  } catch (error) {
    console.error('Erro na rota PUT /api/:id:', error);
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
});

// API para remover jogador
router.delete('/api/:id', async (req, res) => {
  try {
    await jogadoresController.deleteJogador(req, res);
  } catch (error) {
    console.error('Erro na rota DELETE /api/:id:', error);
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
});

export default router;
