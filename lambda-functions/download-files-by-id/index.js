const ValidationError = require('../common/validation-error');
const genericErrorResponseBody = require('../common/generic-error-response');

const AWS = require("aws-sdk");
const s3 = new AWS.S3( { apiVersion: '2006-03-01'} );
const archiver = require('archiver');

async function downloadFilesById(req, fileStorageLocation) {
    try {
        const ids = getID(req);
        validateID(ids);

        const params = {
            Bucket: 'zdy-website-downloads',
            Key: 'original/1.jpg'
        };
        const file = await s3.getObject(params).promise();
        console.log(file)
    } catch (e) {
        if (e instanceof ValidationError) {
            return {
                status: 'error',
                message: e.message
            };
        } else {
            return {...genericErrorResponseBody};
        }
    }
}

/**
 * return an array of IDs, can be empty array
 */
const getID = (req) => {
    if (req.query.id !== undefined) {
        const value = req.query.id;
        return value.split(',');
    }
    return []
};

/**
 * @param array {string[]} Array of IDs
 * throw Validation Error if IDs are not valid
 */
const validateID = (array) => {
    if (array.length === 0) {
        // ID param provided buy value is empty
        throw new ValidationError('must provide id values separated by comma');
    } else {
        let error = false;
        for (let i=0; i<array.length; i++) {
            if (isNaN(parseInt(array[i]))) {
                error = true;
                break;
            }
        }

        if (error) {
            // some IDs are not number
            throw new ValidationError('id value must be number, and separated by comma');
        }
    }
};

'use strict';

module.exports = downloadFilesById;
