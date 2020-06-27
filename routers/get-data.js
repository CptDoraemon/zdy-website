const url = require('./URLs').getData;
const getQueryStringWherePart = require('./helpers/get-query-string-where-part');
const queryDB = require('./helpers/query-db');
const getQueryStringOrderPart = require('./helpers/get-query-string-order-part');
const {getQueryStringPagePart, getRowPerPage} = require('./helpers/get-query-string-page-part');
const errorHandler = require('../common/errors/error-handler');

/**
 * /api/get-data?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20
 */
const getDataRouter = (app, dbConnection) => {
    app.get(url, async (req, res) => {
        try {
            const queryStringBase = `SELECT * FROM ${process.env.DB_TABLE}`;
            const where = getQueryStringWherePart(req);
            const order = getQueryStringOrderPart(req);
            const rowPerPage = getRowPerPage(req);
            const page = getQueryStringPagePart(req, rowPerPage);
            const queryString = `${queryStringBase} ${where} ${order} ${page}`;

            // tableData
            const tableData = await queryDB(dbConnection, queryString);

            // totalPages
            const countRowQueryString = `SELECT COUNT(*) FROM ${process.env.DB_TABLE} ${where}`;
            const result = await queryDB(dbConnection, countRowQueryString);
            const totalRows = parseInt(Object.values(result[0])[0]);

            res.json({
                status: 'OK',
                data: {
                    tableData: tableData.slice(),
                    totalRows,
                    totalPages: Math.ceil(totalRows / rowPerPage)
                }
            });
        } catch (e) {
            errorHandler(e, res)
        }
    })
};

module.exports = getDataRouter;
