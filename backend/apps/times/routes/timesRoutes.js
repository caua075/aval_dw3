const express = require('express');
const timesController = require('../controller/timesController');
const authenticateToken = require('../../../middleware/authenticateToken');
const appLogin = require("../../login/controller/ctlLogin");

const router = express.Router();

router.post("/login", appLogin.Login);
router.post("/logout", appLogin.Logout);

router.post('/', authenticateToken, timesController.insertTime);
router.get('/', authenticateToken, timesController.getAllTimes);
router.get('/:id', authenticateToken, timesController.getTimeById);
router.put('/:id', authenticateToken, timesController.updateTime);
router.delete('/:id', authenticateToken, timesController.deleteTime);

module.exports = router;