const url = require('./URLs').getData;
const getQueryStringFromFilter = require('./helpers/get-query-string-from-filter');
const queryDB = require('./helpers/query-db');
const sendGenericErrorResponse = require('./helpers/generic-error-response');
const getQueryStringOrderPart = require('./helpers/get-query-string-order-part');
const {getQueryStringPagePart, getRowPerPage} = require('./helpers/get-query-string-page-part');

let TOTAL_ROWS = null;
const COUNT_ROWS_QUERY_STRING = 'SELECT COUNT(*) FROM test';

/**
 * /api/get-data?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20
 */
const getDataRouter = (app, dbConnection) => {
    app.get(url, async (req, res) => {
        try {
            const queryStringWithFilter = getQueryStringFromFilter(req, res);
            if (queryStringWithFilter === '') return;

            const order = getQueryStringOrderPart(req);
            const rowPerPage = getRowPerPage(req);
            const page = getQueryStringPagePart(req, rowPerPage);
            const queryString = `${queryStringWithFilter} ${order} ${page}`;

            // tableData
            const tableData = await queryDB(dbConnection, queryString);

            // totalPages
            if (TOTAL_ROWS === null) {
                const result = await queryDB(dbConnection, COUNT_ROWS_QUERY_STRING);
                TOTAL_ROWS = parseInt(Object.values(result[0])[0]);
            }

            res.json({
                status: 'OK',
                data: {
                    tableData: tableData.slice(),
                    totalPages: Math.floor(TOTAL_ROWS / rowPerPage)
                }
            });
        } catch (e) {
            sendGenericErrorResponse(e, res)
        }
    })
};

module.exports = getDataRouter;
