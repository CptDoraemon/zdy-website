const url = require('./URLs');
const getQueryStringWherePart = require('./helpers/get-query-string-where-part');
const errorHandler = require('../common/errors/error-handler');

const getFilesWithFilter = (app, dbConnection, fileQueue) => {
    app.get(url.getFilesWithFilter, async (req, res) => {
        try {
            const where = getQueryStringWherePart(req);
            fileQueue.add(where);

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
