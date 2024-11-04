const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY; 

const userProfileStats = async (req, res) => {
    if(!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try{
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

        const matchDetails = await Promise.all(matchDetailsPromises);

        const stats = matchDetails.map(match => {
            return {
                matchId: match.data.metadata.match_id,
                placement: match.data.info.placement,
                time: match.data.info.game_datetime,
                participants: match.data.info.participants
            }
        });

        res.json({
            message: 'Stats fetched successfully',
            stats: stats
        });
    } catch(error){

    }
}

module.exports = { userProfileStats }