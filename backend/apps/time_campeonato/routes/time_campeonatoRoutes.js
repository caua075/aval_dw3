const express = require('express');
const time_campeonatoController = require('../controller/time_campeonatoController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

// Rota Time_Campeonato
router.get('/', authenticateToken, time_campeonatoController.getTimeCampeonato);
router.get('/:id', authenticateToken, time_campeonatoController.getTimeCampeonatoById);
router.post('/', authenticateToken, time_campeonatoController.insertTimeCampeonato);
router.put('/:id', authenticateToken, time_campeonatoController.updateTimeCampeonato);
router.delete('/:id', authenticateToken, time_campeonatoController.deleteTimeCampeonato);

module.exports = router;