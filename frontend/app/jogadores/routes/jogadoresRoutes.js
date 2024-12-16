import express from 'express'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import jogadoresController from '../controller/jogadoresController.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  // Envia o arquivo jogadores.html localizado na pasta public/html como resposta.
  res.sendFile(path.join(__dirname, '../../../public/html/jogadores.html'));
});

// Rota da API para listar todos os jogadores.
router.get('/api', async (req, res) => {
  try {
    // Chama a função getJogadores do controlador
    await jogadoresController.getJogadores(req, res);
  } catch (error) {
    console.error('Erro na rota GET /api:', error);
    res.status(500).json({ message: 'Erro ao listar jogadores.' });
  }
});

// Rota da API para adicionar um novo jogador.
router.post('/api', async (req, res) => {
  try {
    // Chama a função insertJogador do controlador 
    await jogadoresController.insertJogador(req, res);
  } catch (error) {
    console.error('Erro na rota POST /api:', error);
    res.status(500).json({ message: 'Erro ao adicionar jogador.' });
  }
});

// Rota da API para atualizar os dados de um jogador.
router.put('/api/:id', async (req, res) => {
  try {
    // Chama a função updateJogador do controlador 
    await jogadoresController.updateJogador(req, res);
  } catch (error) {
    console.error('Erro na rota PUT /api/:id:', error);
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
});

// Rota da API para remover um jogador (soft delete).
router.delete('/api/:id', async (req, res) => {
  try {
    // Chama a função deleteJogador 
    await jogadoresController.deleteJogador(req, res);
  } catch (error) {
    console.error('Erro na rota DELETE /api/:id:', error);
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
});

export default router;
