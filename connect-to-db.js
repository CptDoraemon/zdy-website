const mysql = require('mysql');

const connectToDB = () => {
    const connection = mysql.createPool({
        connectionLimit : 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    return connection
};

module.exports = connectToDB;
