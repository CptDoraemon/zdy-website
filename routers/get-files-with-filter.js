const url = require('./URLs');
const getQueryStringWherePart = require('./helpers/get-query-string-where-part');
const queryDB = require('./helpers/query-db');
const errorHandler = require('../common/errors/error-handler');

const getFilesWithFilter = (app, dbConnection, fileQueue) => {
    app.get(url.getFilesWithFilter, async (req, res) => {
        try {
            const where = getQueryStringWherePart(req);
            fileQueue.add(where);

            const queryString= `SELECT * FROM ${process.env.DB_TABLE} ${where}`;
            const result = await queryDB(dbConnection, queryString);
            const IDs = result.map(row => row.id);

            res.json({
                status: 'OK',
                data: {
                    requested: true
                }
            })
        } catch (e) {
            errorHandler(e, res);
        }
    })
};

module.exports = getFilesWithFilter;
