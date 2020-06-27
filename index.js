const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const useCorsForSelectedRouters = require('./routers/cors');
const connectToDB = require('./connect-to-db');
const getDataRouter = require('./routers/get-data');
const getFilesByIdRouter = require('./routers/get-files-by-id');
const getCaseDetailRouter = require('./routers/get-case-detail');

const MOCK_PICS_DIR_RELATIVE = '/mock_pics';
const MOCK_PICS_DIR = path.join(__dirname, 'assets', MOCK_PICS_DIR_RELATIVE);
const ZIP_FOLDER_NAME = 'download_temp';
const ZIP_DIR = path.join(__dirname, ZIP_FOLDER_NAME);

app.use(compression());
// frontend static files
app.use(express.static(path.join(__dirname, 'client/build')));
// temp download static files
app.use(`/${ZIP_FOLDER_NAME}`, express.static(path.join(__dirname, ZIP_FOLDER_NAME)));
// mock pics static files
app.use(MOCK_PICS_DIR_RELATIVE, express.static(path.join(__dirname, 'assets/mock_pics')));

// Connect to DB
const dbConnection = connectToDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// cors
useCorsForSelectedRouters(app);

// API routers
getDataRouter(app, dbConnection);
getCaseDetailRouter(app, dbConnection, MOCK_PICS_DIR_RELATIVE);
getFilesByIdRouter(app, dbConnection, MOCK_PICS_DIR, ZIP_DIR, ZIP_FOLDER_NAME);
// API routers end

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
