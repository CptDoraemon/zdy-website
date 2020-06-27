const ValidationError = require('./validation-error');
const respondGenericError = require('./generic-error-response');

/**
 * @param e {Error}
 * @param res express router response object
 */
const errorHandler = (e, res) => {
    if (e instanceof ValidationError) {
        res.json({
            status: 'error',
            message: e.message
        });
    } else {
        respondGenericError(e, res)
    }
};

module.exports = errorHandler;
