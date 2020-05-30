const sendGenericErrorResponse = (e, res) => {
    console.log(e);
    res.json({
        status: 'error',
        message: 'server error'
    });
};

module.exports = sendGenericErrorResponse;
