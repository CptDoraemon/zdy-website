const url = require('./URLs').download;
const getQueryStringFromFilter = require('./helpers/get-query-string-from-filter');
const queryDB = require('./helpers/query-db');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

/**
 * download by ID or by filters
 * if id exists, any filter will be ignored
 * download all files if no query param exists
 * /api/download?sex=1,2&death=0,1&severity=1,2,3&ageMin=10&ageMax=20&id=1,2,3
 */
const downloadRouter = (app, dbConnection, sourceDir, targetDir) => {
    app.get(url, async (req, res) => {
        try {
            let IDs = getID(req);
            if (IDs !== null) {
                // searching by ID
                const areIDValidate = validateID(IDs, res);
                if (!areIDValidate) return;
            } else {
                // searching by filter
                const queryString = getQueryStringFromFilter(req, res);
                if (queryString === '') return;
                const result = await queryDB(dbConnection, queryString);
                IDs = result.map(row => row.id);
            }

            const {path, size} = await getZipFiles(IDs, sourceDir, targetDir);
            console.log(path, size);
            res.download(path);
        } catch (e) {
            console.log(e);
            res.json({
                status: 'error',
            });
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
        const fileName = `data-download--${Date.now().toString(36)}.zip`;
        const outputDir = path.join(targetDir, fileName);
        const output = fs.createWriteStream(outputDir);

        output.on('close', () => {
            resolve(() => ({
                path: outputDir,
                size: zip.pointer()
            }));
        });

        zip.on('warning', (e) => {
            console.log(e);
        });

        zip.on('error', (e) => {
            console.log(e);
            reject(e)
        });

        IDArray.forEach(id => {
            console.log(sourceDir, `${id}.jpg`);
            zip.file(path.join(sourceDir, `${id}.jpg`), {name: `${id}.jpg`})
        });
        zip.finalize();
    });
};

module.exports = downloadRouter;
