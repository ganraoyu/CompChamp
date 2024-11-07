const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY;

const getLeaderboard = async (endpoint, res, rank) => {
    try {
        const response = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/${endpoint}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        res.json({
            message: `${rank} leaderboard fetched successfully`,
            leaderboard: response.data
        });

    } catch (error) {
        console.error(`Error fetching ${rank} data:`, error.response ? error.response.data : error.message);
        res.status(500).send(`Error connecting to Riot API for ${rank}`);
    }
};

const getChallengerLeaderboard = (req, res) => getLeaderboard('challenger', res, 'Challenger');
const getGrandmasterLeaderboard = (req, res) => getLeaderboard('grandmaster', res, 'Grandmaster');
const getMasterLeaderboard = (req, res) => getLeaderboard('master', res, 'Master');

module.exports = { getChallengerLeaderboard, getGrandmasterLeaderboard, getMasterLeaderboard };
