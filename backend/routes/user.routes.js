const express = require('express');
const { getUserByGameNameAndTagLine, getUserMatches } = require('../controllers/user.controller');
const router = express.Router();


router.get('/:gameName/:tagLine', getUserByGameNameAndTagLine);
router.get('/matches/:gameName/:tagLine', getUserMatches);

module.exports = router;
