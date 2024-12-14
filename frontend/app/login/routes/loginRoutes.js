const express = require('express');
const loginController = require('../controller/loginController');

const router = express.Router();

router.get('/', loginController.renderLogin);
router.post('/', loginController.login);

module.exports = router;
