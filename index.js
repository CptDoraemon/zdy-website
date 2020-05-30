const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const useCorsForSelectedRouters = require('./routers/cors');
const connectToDB = require('./connect-to-db');
const getDataRouter = require('./routers/get-data');
const requestZipFileRouter = require('./routers/download').requestZipFileRouter;
const getFileRouter = require('./routers/download').getFileRouter;

const MOCK_PICS_DIR = path.join(__dirname, 'assets/mock_pics');
const ZIP_DIR = path.join(__dirname, 'download_temp');

const dbConnection = connectToDB();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/mock-pics', express.static(path.join(__dirname, 'assets/mock_pics')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// cors
useCorsForSelectedRouters(app);

// API routers
getDataRouter(app, dbConnection);
requestZipFileRouter(app, dbConnection, MOCK_PICS_DIR, ZIP_DIR);
getFileRouter(app, ZIP_DIR);
// API routers end

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
