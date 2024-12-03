const express = require('express');
const campeonatosController = require('../controller/campeonatosController');
const authenticateToken = require('../../../middleware/authenticateToken');
const appLogin = require("../../login/controller/ctlLogin");

const router = express.Router();

// Rota Login
router.post("/login", appLogin.Login);
router.post("/logout", appLogin.Logout);

// Rota Campeonatos
router.get('/', authenticateToken, campeonatosController.getCampeonato);
router.get('/:id', authenticateToken, campeonatosController.getCampeonatoById);
router.post('/', authenticateToken, campeonatosController.insertCampeonato);
router.put('/:id', authenticateToken, campeonatosController.updateCampeonato);
router.delete('/:id', authenticateToken, campeonatosController.deleteCampeonato);

module.exports = router;
