import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para simular __dirname
import campeonatosController from '../controller/campeonatosController.js';

// Usando fileURLToPath para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Página de campeonatos
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/html/campeonatos.html'));
});

// API para listar times
router.get('/api', async (req, res) => {
  try {
    await campeonatosController.getCampeonatos(req, res);
  } catch (error) {
    console.error('Erro na rota GET /api:', error);
    res.status(500).json({ message: 'Erro ao listar campeonatos.' });
  }
});

// API para adicionar o campeonato
router.post('/api', async (req, res) => {
  try {
    await campeonatosController.insertCampeonato(req, res);
  } catch (error) {
    console.error('Erro na rota POST /api:', error);
    res.status(500).json({ message: 'Erro ao adicionar o campeonato.' });
  }
});

// API para editar o campeonato
router.put('/api/:id', async (req, res) => {
  try {
    await campeonatosController.updateCampeonato(req, res);
  } catch (error) {
    console.error('Erro na rota PUT /api/:id:', error);
    res.status(500).json({ message: 'Erro ao atualizar o campeonato.' });
  }
});

// API para remover o campeonato
router.delete('/api/:id', async (req, res) => {
  try {
    await campeonatosController.deleteCampeonato(req, res);
  } catch (error) {
    console.error('Erro na rota DELETE /api/:id:', error);
    res.status(500).json({ message: 'Erro ao remover o campeonato.' });
  }
});

export default router;
