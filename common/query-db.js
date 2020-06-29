const queryDB = (dbConnection, queryString) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(queryString, function (error, results) {
            if (error) {
                reject(error);
                return
            }
            resolve(results)
        });
    });
};

module.exports = queryDB;
