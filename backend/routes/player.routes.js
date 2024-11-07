const express = require('express');
const { getPlayerByGameNameAndTagLine, getPlayerMatches } = require('../controllers/Player.controller');
const router = express.Router();


router.get('/:gameName/:tagLine', getPlayerByGameNameAndTagLine);
router.get('/matches/:gameName/:tagLine', getPlayerMatches);

module.exports = router;
