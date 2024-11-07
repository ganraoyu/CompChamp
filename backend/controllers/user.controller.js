const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY; 

const getUserByGameNameAndTagLine = async (req, res) => {
    const { gameName, tagLine } = req.params;

    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try {
        const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        const puuid = response.data.puuid;

        res.json({
            message: 'PUUID fetched successfully',
            puuid: puuid,
            UserData: response.data
        });
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
        console.log(RIOT_API_KEY)
    }
};

const getUserMatches = async (req, res) => {
    const { gameName, tagLine } = req.params;

    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try {
        const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        const puuid = response.data.puuid;

        const matchHistoryResponse = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        const matchIds = matchHistoryResponse.data;

        const matchDetailsPromises = matchIds.map(matchId =>
            axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`, {
                headers: {
                    'X-Riot-Token': RIOT_API_KEY
                }
            })
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        /* 
        const winStatuses = matchDetails.map(match => {
            const participant = match.info.participants.find(p => p.puuid === puuid);
            return participant ? participant.win : null;
        });
        */

        res.json({
            message: 'Match history fetched successfully',
            /* winStatuses: winStatuses */
            matchDetails: matchDetails[0]
        });
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

module.exports = { getUserByGameNameAndTagLine, getUserMatches }; 