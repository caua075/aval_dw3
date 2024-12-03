const express = require('express');
const timesController = require('../controller/timesController');
const authenticateToken = require('../../../middleware/authenticateToken');
const appLogin = require("../../login/controller/ctlLogin");

const router = express.Router();

router.post("/login", appLogin.Login);
router.post("/logout", appLogin.Logout);

router.get('/tim/', authenticateToken, timesController.getAllTimes);
router.get('/tim/:id', authenticateToken, timesController.getTimeById);
router.post('/tim', authenticateToken, timesController.insertTime);
router.put('/tim/:id', authenticateToken, timesController.updateTime);
router.delete('/tim/:id', authenticateToken, timesController.deleteTime);

module.exports = router;
