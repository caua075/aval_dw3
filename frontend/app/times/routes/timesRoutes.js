import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para simular __dirname
import timesController from '../controller/timesController.js';

// Usando fileURLToPath para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Página de times
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/html/times.html'));
});

// API para listar times
router.get('/api', async (req, res) => {
  try {
    await timesController.getTimes(req, res);
  } catch (error) {
    console.error('Erro na rota GET /api:', error);
    res.status(500).json({ message: 'Erro ao listar times.' });
  }
});

// API para adicionar time
router.post('/api', async (req, res) => {
  try {
    await timesController.insertTime(req, res);
  } catch (error) {
    console.error('Erro na rota POST /api:', error);
    res.status(500).json({ message: 'Erro ao adicionar time.' });
  }
});

// API para editar time
router.put('/api/:id', async (req, res) => {
  try {
    await timesController.updateTime(req, res);
  } catch (error) {
    console.error('Erro na rota PUT /api/:id:', error);
    res.status(500).json({ message: 'Erro ao atualizar time.' });
  }
});

// API para remover time
router.delete('/api/:id', async (req, res) => {
  try {
    await timesController.deleteTime(req, res);
  } catch (error) {
    console.error('Erro na rota DELETE /api/:id:', error);
    res.status(500).json({ message: 'Erro ao remover time.' });
  }
});

export default router;
