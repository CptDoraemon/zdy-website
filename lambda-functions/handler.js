'use strict';
require('dotenv').config();
const mysql = require('mysql');

const queryDatabaseHandler = require('./query-database/index');
const downloadFilesByIdHandler = require('./download-files-by-id/index');

// DB Connection
const dbConnection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Downloadable Files Storage Location
const downloadableFilesStorageLocation = process.env.DOWNLOADABLE_FILES_STORAGE_LOCATION;

module.exports.queryDatabase = async (event) => {
    const req = {};
    req.query = {...event.queryStringParameters};
    const responseBody = await queryDatabaseHandler(req, dbConnection);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({...responseBody}, null, 2),
    };
};

module.exports.downloadFilesById = async (event) => {
    const req = {};
    req.query = {...event.queryStringParameters};
    const responseBody = await downloadFilesByIdHandler(req, downloadableFilesStorageLocation);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({...responseBody}, null, 2),
    };
};

module.exports.test = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'test',
                event,
                context
            },
            null,
            2
        ),
    };
};
