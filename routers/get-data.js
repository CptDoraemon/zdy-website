const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000'],
    // origin: '*',
    maxAge: 31536000,
    methods: 'GET'
};

/**
 * /api/get-data?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20
 */
const getDataRouter = (app, dbConnection) => {
    app.get('/api/get-data', cors(corsOptions), async (req, res) => {
        try {
            const queryString = getQueryString(req, res);
            if (queryString === '') return;

            const result = await getData(dbConnection, queryString);
            res.json({
                status: 'OK',
                data: result.slice()
            });
        } catch (e) {
            console.log(e);
            res.json({
                status: 'error',
            });
        }
    })
};

/**
 * check query params validation
 * return queryString if all validated
 * return empty string and respond error message if not validated
 */
const getQueryString = (req, res) => {
    const sex = req.query.sex;
    const death = req.query.death;
    const severity = req.query.severity;
    const ageMin = req.query.ageMin;
    const ageMax = req.query.ageMax;

    let queryString = 'SELECT * FROM test';
    const whereConstraints = [];

    const params = [
        {
            key: 'sex',
            value: sex,
            possibleValues: ['1', '2']
        },
        {
            key: 'death',
            value: death,
            possibleValues: ['0', '1']
        },
        {
            key: 'severity',
            value: severity,
            possibleValues: ['1', '2', '3']
        },
    ];

    for (let i=0; i<params.length; i++) {
        if (params[i].value !== undefined) {
            const valueArray = queryParamValueToStringArray(params[i].value);
            const isValidate = validateQueryParam(params[i].key, valueArray, params[i].possibleValues, res);
            if (!isValidate) {
                return ''
            }
            pushConstraints(params[i].key, valueArray, whereConstraints);
        }
    }

    if (ageMin !== undefined && ageMax !== undefined) {
        const min = parseInt(ageMin);
        const max = parseInt(ageMax);
        if (min >= max) {
            res.json({
                status: 'error',
                message: `ageMax has to be greater than ageMin`
            });
            return ''
        }
        whereConstraints.push(`(age>=${min} AND age<=${max})`)
    } else if (ageMin !== undefined && ageMax === undefined) {
        const min = parseInt(ageMin);
        whereConstraints.push(`(age>=${min})`)
    } else if (ageMin === undefined && ageMax !== undefined) {
        const max = parseInt(ageMax);
        whereConstraints.push(`(age<=${max})`)
    }

    if (whereConstraints.length > 0) {
        return `${queryString} WHERE ${whereConstraints.join(' AND ')}`
    } else {
        return queryString
    }

};

const pushConstraints = (key, valueArray, constraintsArray) => {
    const orConstraints = valueArray.map(_ => `${key}=${_}`);
    constraintsArray.push(`(${orConstraints.join(' OR ')})`)
};

/**
 * @param value {string}
 * @returns {string[]}
 */
const queryParamValueToStringArray = (value) => {
    const valueArray = value.split(',');
    return valueArray.map((value) => value.toString());
};

/**
 * check whether the query parameter is validate,
 * return boolean,
 * and will response error message if not validate
 * @param value {string[]}
 */
const validateQueryParam = (key, value, possibleValuesArray, res) => {
    let isValidate = true;
    for (let i=0; i<value.length; i++) {
        if (possibleValuesArray.indexOf(value[i]) === -1) {
            isValidate = false;
            break
        }
    }

    if (isValidate) {
        return true
    } else {
        res.json({
            status: 'error',
            message: `The possible values for ${key} are ${possibleValuesArray}`
        });
        return false
    }
};

const getData = (dbConnection, queryString) => {
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

module.exports = getDataRouter;
