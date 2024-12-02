const express = require('express');
const campeonatosController = require('../controllers/campeonatosController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, campeonatosController.getJogadores);
router.get('/:id', authenticateToken, campeonatosController.getJogadorById);
router.post('/', authenticateToken, campeonatosController.insertJogador);
router.put('/:id', authenticateToken, campeonatosController.updateJogador);
router.delete('/:id', authenticateToken, campeonatosController.deleteJogador);

module.exports = router;
