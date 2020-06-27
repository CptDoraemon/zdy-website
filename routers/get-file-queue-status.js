const url = require('./URLs');
const errorHandler = require('../common/errors/error-handler');

const getFileQueueStatus = (app, fileQueue) => {
    app.get(url.getFileQueueStatus, async (req, res) => {
        try {
            console.log(fileQueue);
            res.json({
                status: 'OK',
                data: {
                    queue: fileQueue.queue.slice()
                }
            })
        } catch (e) {
            errorHandler(e, res);
        }
    })
};

module.exports = getFileQueueStatus;
