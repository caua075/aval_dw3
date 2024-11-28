const express = require('express');
const jogadoresController = require('../controller/jogadoresController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, jogadoresController.getJogadores);
router.get('/:id', authenticateToken, jogadoresController.getJogadorById);
router.post('/', authenticateToken, jogadoresController.insertJogador);
router.put('/:id', authenticateToken, jogadoresController.updateJogador);
router.delete('/:id', authenticateToken, jogadoresController.deleteJogador);

module.exports = router;
