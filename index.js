const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
require('dotenv').config();
const LargeFileCompressionQueue = require('./large-file-compression-queue/index');

const useCorsForSelectedRouters = require('./routers/cors');
const connectToDB = require('./connect-to-db');
const getDataRouter = require('./routers/get-data');
const getFilesByIdRouter = require('./routers/get-files-by-id');
const getFilesWithFilterRouter = require('./routers/get-files-with-filter');
const getCaseDetailRouter = require('./routers/get-case-detail');
const downloadFileRouter = require('./routers/download');
const getFileQueueStatusRouter = require('./routers/get-file-queue-status');

const MOCK_PICS_DIR_RELATIVE = '/mock_pics';
const MOCK_PICS_DIR = path.join(__dirname, 'assets', MOCK_PICS_DIR_RELATIVE);
const ZIP_DIR = path.join(__dirname, 'download_temp');

app.use(compression());
// frontend static files
app.use(express.static(path.join(__dirname, 'client/build')));
// mock pics static files
app.use(MOCK_PICS_DIR_RELATIVE, express.static(path.join(__dirname, 'assets/mock_pics')));

// Connect to DB
const dbConnection = connectToDB();
// File Queue
const FILE_QUEUE = new LargeFileCompressionQueue();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// cors
useCorsForSelectedRouters(app);

// API routers
getDataRouter(app, dbConnection);
getCaseDetailRouter(app, dbConnection, MOCK_PICS_DIR_RELATIVE);
getFilesByIdRouter(app, dbConnection, MOCK_PICS_DIR, ZIP_DIR);
getFilesWithFilterRouter(app, dbConnection, FILE_QUEUE);
downloadFileRouter(app, ZIP_DIR);
getFileQueueStatusRouter(app, FILE_QUEUE);
// API routers end

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
