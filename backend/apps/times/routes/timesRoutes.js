const express = require('express');
const timesController = require('../controller/timesController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

router.get('/tim/', authenticateToken, timesController.getAllTimes);
router.get('/tim/:id', authenticateToken, timesController.getTimeById);
router.post('/tim', authenticateToken, timesController.insertTime);
router.put('/tim/:id', authenticateToken, timesController.updateTime);
router.delete('/tim/:id', authenticateToken, timesController.deleteTime);

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = router;
