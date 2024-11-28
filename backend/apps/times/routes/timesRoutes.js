const express = require('express');
const timesController = require('../controller/timesController');
const authenticateToken = require('../../../middleware/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, timesController.getAllTimes);
router.get('/:id', authenticateToken, timesController.getTimeById);
router.post('/', authenticateToken, timesController.insertTime);
router.put('/:id', authenticateToken, timesController.updateTime);
router.delete('/:id', authenticateToken, timesController.deleteTime);

module.exports = router;
