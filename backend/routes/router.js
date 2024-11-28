const express = require('express');

const router = express.Router();

const jogadoresRoutes = require('../apps/jogadores/routes/jogadoresRoutes');
router.use('/api/jogadores', jogadoresRoutes);

module.exports = router;