const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY; 


const getChallengerLeaderboard = async (req, res) => {  
    try {
        const response = await axios.get('https://na1.api.riotgames.com/tft/league/v1/challenger', {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        res.json({
            message: 'Challenger leaderboard fetched successfully',
            leaderboard: response.data
        });

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};  

const getGrandmasterLeaderboard = async (req, res) => {
    try {
        const response = await axios.get('https://na1.api.riotgames.com/tft/league/v1/grandmaster', {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        res.json({
            message: 'Grandmaster leaderboard fetched successfully',
            leaderboard: response.data
        });

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}

const getMasterLeaderboard = async (req, res) => {
    try {
        const response = await axios.get('https://na1.api.riotgames.com/tft/league/v1/master', {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        res.json({
            message: 'Master leaderboard fetched successfully',
            leaderboard: response.data
        });

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};
module.exports = { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard };