const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const leadboardRoutes = require('./routes/leaderboard.routes.js');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

console.log('RIOT_API_KEY:', RIOT_API_KEY); 

app.get('/', (req, res) => {
    res.send('Welcome to the Riot API server!');
});


app.use('/tft', userRoutes);
app.use('/', leadboardRoutes);                                                      

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});     
