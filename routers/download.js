const url = require('./URLs');
const getQueryStringWherePart = require('./helpers/get-query-string-where-part');
const sendGenericErrorResponse = require('./helpers/generic-error-response');
const queryDB = require('./helpers/query-db');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

/**
 * request generate Zip file by ID or by filters
 * if id exists, any filter will be ignored
 * zip all files if no query param exists
 * /api/request-zip?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20&id=1,2,3
 */
const requestZipFileRouter = (app, dbConnection, sourceDir, targetDir) => {
    app.get(url.requestZip, async (req, res) => {
        try {
            let IDs = getID(req);
            if (IDs !== null) {
                // searching by ID
                const areIDValidate = validateID(IDs, res);
                if (!areIDValidate) return;
            } else {
                // searching by filter
                const where = getQueryStringWherePart(req, res);
                if (where === null) return;

                const queryString= `SELECT * FROM ${process.env.DB_TABLE} ${where}`;
                const result = await queryDB(dbConnection, queryString);
                IDs = result.map(row => row.id);
            }

            const {filename, size} = await getZipFiles(IDs, sourceDir, targetDir);
            res.json({
                status: 'OK',
                data: {
                    filename,
                    size
                }
            })
        } catch (e) {
            sendGenericErrorResponse(e, res)
        }
    })
};

/**
 * download file by given filename
 * /api/download?filename=example.zip
 */
const getFileRouter = (app, downloadDir) => {
    app.get(url.download, async (req, res) => {
        try {
            let filename = req.query.filename;

            if (filename === undefined) {
                res.json({
                    status: 'error',
                    message: 'require filename query parameter'
                });
                return;
            }

            filename = decodeURIComponent(filename);
            const filePath = path.join(downloadDir, filename);
            const isFileExists = await checkFileExists(filePath);

            if (isFileExists) {
                res.download(filePath)
            } else {
                res.json({
                    status: 'error',
                    message: 'file does not exists'
                });
            }

        } catch (e) {
            sendGenericErrorResponse(e, res)
        }
    })
};

/**
 * return an array of IDs if ID param exists
 * return null of ID param does not exists
 */
const getID = (req) => {
    if (req.query.id !== undefined) {
        const value = req.query.id;
        return value.split(',');
    } else {
        return null
    }
};

/**
 * @param array {string[]} Array of IDs
 * return false if any ID is invalidate, and respond error message
 * return true if all IDs are validate
 */
const validateID = (array, res) => {
    if (array.length === 0) {
        // ID param provided buy value is empty
        res.json({
            status: 'error',
            message: 'must provide id values separated by comma'
        });
        return false
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
            res.json({
                status: 'error',
                message: 'id values must be number, and separated by comma'
            });
            return false
        } else {
            return true
        }
    }
};

/**
 * @param IDArray {string[]} An array of IDs
 * @param sourceDir {string} the path of input file directory
 * @param targetDir {string} the path of zou file directory
 */
const getZipFiles = (IDArray, sourceDir, targetDir) => {
    return new Promise((resolve, reject) => {
        const zip = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        const fileName = `data-download-${Date.now().toString(36)}.zip`;
        const outputDir = path.join(targetDir, fileName);
        const output = fs.createWriteStream(outputDir);

        output.on('close', () => {
            resolve({
                filename: fileName,
                size: zip.pointer()
            });
        });

        zip.on('warning', (e) => {
            console.log(e);
        });

        zip.on('error', (e) => {
            console.log(e);
            reject(e)
        });

        zip.pipe(output);

        IDArray.forEach(id => {
            zip.file(path.join(sourceDir, `${id}.jpg`), {name: `${id}.jpg`})
        });
        zip.finalize();
    });
};

const checkFileExists = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(err === null)
        });
    });
};

module.exports = {
    requestZipFileRouter,
    getFileRouter
};
