const express = require('express');
const jogadoresController = require('../controller/jogadoresController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

router.get('/jog', authenticateToken, jogadoresController.getJogadores);
router.get('/jog/:id', authenticateToken, jogadoresController.getJogadorById);
router.post('/jog', authenticateToken, jogadoresController.insertJogador);
router.put('/jog/:id', authenticateToken, jogadoresController.updateJogador);
router.delete('/jog/:id', authenticateToken, jogadoresController.deleteJogador);

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = router;
