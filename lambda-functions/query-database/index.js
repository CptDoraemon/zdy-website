const ValidationError = require('../common/validation-error');
const genericErrorResponseBody = require('../common/generic-error-response');
const getQueryStringWherePart = require('./helpers/get-query-string-where-part');
const getQueryStringOrderPart = require('./helpers/get-query-string-order-part');
const {
    getQueryStringPagePart,
    getRowPerPage
} = require('./helpers/get-query-string-page-part');
const queryDB = require('../common/query-db');

async function queryDatabaseHandler(req, dbConnection) {
    try {
        // This will allow us to freeze open connections to a database
        // context.callbackWaitsForEmptyEventLoop = false;

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

        return {
            status: 'OK',
            data: {
                tableData: tableData.slice(),
                totalRows,
                totalPages: Math.ceil(totalRows / rowPerPage)
            }
        };
    } catch (e) {
        if (e instanceof ValidationError) {
            return {
                status: 'error',
                message: e.message
            };
        } else {
            return {...genericErrorResponseBody};
        }
    }
}

module.exports = queryDatabaseHandler;
