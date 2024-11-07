const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const axiosClient = require('../utils/axiosClient');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY; 

const userWinRate = async (req, res) => {

    const { gameName, tagLine } = req.params;

    if(!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try{
        const response = await axiosClient.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).send('Puuid not found');
        }
        const matchHistoryResponse = await axiosClient.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data;

        const matchDetailsPromises = matchIds.map(matchId =>
            axiosClient.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        
        const userWinResults = matchDetails.map(matches =>{

            const participant = matches.info.participants.find(
                participant => participant.puuid === puuid
            );

            if(participant){
                return participant.win === true;
            } else {
                return false;
            }
        })
            
        const wins = userWinResults.filter(result => result === true).length;
        const totalGames = userWinResults.length;
        const winRate = wins / totalGames * 100;

        res.json({
            message: `${gameName}#${tagLine} has a ${winRate}% win rate`,
        });  

        /* only for recent 20 matches */ 

    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}

const userMostPlayedTraits = async (req, res) => {

    const { gameName, tagLine } = req.params;

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

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        res.json({
            message: 'Match history fetched successfully',
            matchDetails: matchDetails
        });
    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}
module.exports = { userWinRate };