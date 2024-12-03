const express = require('express');
const jogadoresController = require('../controller/jogadoresController');
const authenticateToken = require('../../../middleware/authenticateToken');
const appLogin = require("../../login/controller/ctlLogin");


const router = express.Router();

router.post("/login", appLogin.Login);
router.post("/logout", appLogin.Logout);

router.get('/jog', authenticateToken, jogadoresController.getJogadores);
router.get('/jog/:id', authenticateToken, jogadoresController.getJogadorById);
router.post('/jog', authenticateToken, jogadoresController.insertJogador);
router.put('/jog/:id', authenticateToken, jogadoresController.updateJogador);
router.delete('/jog/:id', authenticateToken, jogadoresController.deleteJogador);

module.exports = router;
