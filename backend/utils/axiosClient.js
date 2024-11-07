const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const axiosClient = axios.create({
    baseURL: 'https://americas.api.riotgames.com',  // Just the base URL without game-specific params
    headers: {
        'X-Riot-Token': RIOT_API_KEY,
    },
});

console.log('RIOT_API_KEY:', RIOT_API_KEY);

module.exports = axiosClient;
