const express = require('express');
const router = express.Router();
const  { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard } = require('../controllers/leaderBoard.controller.js');

router.get('/challenger', getChallengerLeaderboard);
router.get('/grandmaster', getGrandmasterLeaderboard);
router.get('/master', getMasterLeaderboard);

module.exports = router;