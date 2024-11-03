const express = require('express');
const router = express.Router();

const  { getChallengerLeaderboard, getMasterLeaderboard } = require('../controllers/user.controller');

router.get('/ranks/challenger', getChallengerLeaderboard);
router.get('/ranks/master', getMasterLeaderboard);

module.exports = router;