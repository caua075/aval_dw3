const express = require('express');
const campeonatosController = require('../controller/campeonatosController');
const appLogin = require("../../login/controller/ctlLogin");

const router = express.Router();

// Rota Login
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);

// Rota Campeonatos
router.get('/', appLogin.AutenticaJWT, campeonatosController.getCampeonato);
router.get('/:id', appLogin.AutenticaJWT, campeonatosController.getCampeonatoById);
router.post('/', appLogin.AutenticaJWT, campeonatosController.insertCampeonato);
router.put('/:id', appLogin.AutenticaJWT, campeonatosController.updateCampeonato);
router.delete('/:id', appLogin.AutenticaJWT, campeonatosController.deleteCampeonato);

module.exports = router;
