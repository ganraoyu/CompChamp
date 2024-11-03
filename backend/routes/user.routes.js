const express = require('express');
const { getUserByGameNameAndTagLine, getUserMatches, getChallengerLeaderboard } = require('../controllers/user.controller');
const router = express.Router();


router.get('/:gameName/:tagLine', getUserByGameNameAndTagLine);
router.get('/matches/:gameName/:tagLine', getUserMatches);
router.get('/challenger/leaderboard', getChallengerLeaderboard);

module.exports = router;
