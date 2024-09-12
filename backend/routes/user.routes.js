const express = require('express');
const { getUserByGameNameAndTagLine } = require('../controllers/user.controller');
const router = express.Router();

// Define the route for fetching user data based on gameName and tagLine
router.get('/:gameName/:tagLine', getUserByGameNameAndTagLine);

module.exports = router;
