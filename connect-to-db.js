const mysql = require('mysql');

const connectToDB = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
};

module.exports = connectToDB;
