const express = require('express');
const jogadoresController = require('../controller/jogadoresController');
const authenticateToken = require('../../../middleware/authenticateToken');
const appLogin = require("../../login/controller/ctlLogin");

const router = express.Router();

router.post("/login", appLogin.Login);
router.post("/logout", appLogin.Logout);

router.post('/', authenticateToken, jogadoresController.insertJogador);
router.get('/', authenticateToken, jogadoresController.getJogadores);
router.get('/:id', authenticateToken, jogadoresController.getJogadorById);
router.put('/:id', authenticateToken, jogadoresController.updateJogador);
router.delete('/:id', authenticateToken, jogadoresController.deleteJogador);

module.exports = router;
