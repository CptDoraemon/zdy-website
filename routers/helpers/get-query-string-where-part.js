/**
 *  convert query params such as below
 *  ?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20
 *  to SQL query string
 */

/**
 * check query params validation
 * return queryString if all validated
 * return empty string if no constraints applied
 * return null and respond error message if not validated
 */
const getQueryStringWherePart = (req, res) => {
    const sex = req.query.sex;
    const death = req.query.death;
    const severity = req.query.severity;
    const ageMin = req.query.ageMin;
    const ageMax = req.query.ageMax;

    let queryString = '';
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
                return null
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
            return null
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
 * check whether the query parameter is valid,
 * return boolean,
 * and will response error message if not valid
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

module.exports = getQueryStringWherePart;
