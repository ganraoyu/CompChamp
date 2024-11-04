const express = require('express');
const router = express.Router();
const { userProfileStats } = require('../controllers/stats.controller');

router.get('/stats/:gameName/:tagLine', userProfileStats);

module.exports = router;