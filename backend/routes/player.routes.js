const express = require('express');
const { getPlayerByGameNameAndTagLine, getPlayerMatches } = require('../controllers/Player.controller.js');
const router = express.Router();

router.get('/:region/:gameName/:tagLine', getPlayerByGameNameAndTagLine);
router.get('/matches/:region/:gameName/:tagLine', getPlayerMatches);

module.exports = router;
