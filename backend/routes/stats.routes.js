const express = require('express');
const router = express.Router();
const { userWinRate } = require('../controllers/stats.controller');

router.get('/stats/:gameName/:tagLine', userWinRate);

module.exports = router;