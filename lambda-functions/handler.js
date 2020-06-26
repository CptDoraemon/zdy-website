'use strict';
require('dotenv').config();
const mysql = require('mysql');

const queryDatabaseHandler = require('./query-database/index');

// DB Connection
const dbConnection = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports.queryDatabase = async (event, context) => {
    return queryDatabaseHandler(event, context, dbConnection)
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
