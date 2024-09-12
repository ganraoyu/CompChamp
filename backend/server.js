const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

console.log('RIOT_API_KEY:', RIOT_API_KEY); 

app.get('/', (req, res) => {
    res.send('Welcome to the Riot API server!');
});

// Get gameName and tagLine as input through query params
app.get('/user', async (req, res) => {
    const { gameName, tagLine } = req.query;

    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as query parameters.');
    }

    try {
        // Call the Riot API to get the user data based on gameName and tagLine
        const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        // Get the PUUID from the response
        const puuid = response.data.puuid;

        // Respond with the PUUID
        res.json({
            message: 'PUUID fetched successfully',
            puuid: puuid,
            fullData: response.data
        });
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
