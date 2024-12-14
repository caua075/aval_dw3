const express = require('express');
const path = require('path');
const jogadoresController = require('../controller/jogadoresController');

const router = express.Router();

// Página de jogadores
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/html/jogadores.html'));
});

// API para listar jogadores
router.get('/api', jogadoresController.getJogadores);

// API para adicionar jogador
router.post('/api', jogadoresController.insertJogador);

// API para editar jogador
router.put('/api/:id', jogadoresController.updateJogador);

// API para remover jogador
router.delete('/api/:id', jogadoresController.deleteJogador);

module.exports = router;
