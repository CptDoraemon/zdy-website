const url = require('./URLs').getData;
const getQueryStringFromFilter = require('./helpers/get-query-string-from-filter');
const queryDB = require('./helpers/query-db');
const sendGenericErrorResponse = require('./helpers/generic-error-response');

/**
 * /api/get-data?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20
 */
const getDataRouter = (app, dbConnection) => {
    app.get(url, async (req, res) => {
        try {
            const queryString = getQueryStringFromFilter(req, res);
            if (queryString === '') return;

            const result = await queryDB(dbConnection, queryString);
            // setTimeout(() => {
            //     res.json({
            //         status: 'OK',
            //         data: result.slice()
            //     });
            // }, 3000)
            res.json({
                status: 'OK',
                data: result.slice()
            });
        } catch (e) {
            sendGenericErrorResponse(e, res)
        }
    })
};

module.exports = getDataRouter;
