const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const connectToDB = require('./connect-to-db');
const getDataRouter = require('./routers/get-data');

const dbConnection = connectToDB();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// API routers
getDataRouter(app, dbConnection);
// API routers end

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
