const genericErrorResponseBody = (e) => {
    console.log(e);
    return {
        status: 'error',
        message: 'server error'
    };
};

module.exports = genericErrorResponseBody;
