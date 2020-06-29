const url = require('./URLs');
const errorHandler = require('../common/errors/error-handler');

const getFileQueueStatus = (app, fileQueue) => {
    app.get(url.getFileQueueStatus, async (req, res) => {
        try {
            res.json({
                status: 'OK',
                data: {
                    queue: fileQueue.getQueueSnapshot()
                }
            })
        } catch (e) {
            errorHandler(e, res);
        }
    })
};

module.exports = getFileQueueStatus;
