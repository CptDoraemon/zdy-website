const ValidationError = require('../../common/validation-error');

/**
 * check query params validation
 * return the WHERE part of queryString if all validated, eg 'WHERE age > 0'
 * throw validation error if any param is invalid
 */
const getQueryStringWherePart = (req) => {
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
            validateQueryParam(params[i].key, valueArray, params[i].possibleValues);
            pushConstraints(params[i].key, valueArray, whereConstraints);
        }
    }

    if (ageMin !== undefined && ageMax !== undefined) {
        const min = parseInt(ageMin);
        const max = parseInt(ageMax);
        if (min >= max) {
            throw new ValidationError('ageMax has to be greater than ageMin');
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
 * throw ValidationError if not valid
 * @param value {string[]}
 */
const validateQueryParam = (key, value, possibleValuesArray) => {
    let isValidate = true;
    for (let i=0; i<value.length; i++) {
        if (possibleValuesArray.indexOf(value[i]) === -1) {
            isValidate = false;
            break
        }
    }

    if (!isValidate) {
        throw new ValidationError(`The possible values for ${key} are ${possibleValuesArray}`);
    }
};

module.exports = getQueryStringWherePart;
