const url = require('./URLs');
const errorHandler = require('../common/errors/error-handler');
const ValidationError = require('../common/errors/validation-error');
const path = require('path');
const fs = require('fs');

/**
 * download file by given filename
 * /api/download?filename=example.zip
 */
const downloadFile = (app, downloadDir) => {
    app.get(url.downloadFile, async (req, res) => {
        try {
            let filename = req.query.filename;

            if (filename === undefined) {
                throw new ValidationError('require filename query parameter');
            }
            console.log(filename);

            filename = decodeURIComponent(filename);
            const filePath = path.join(downloadDir, filename);
            const isFileExists = await checkFileExists(filePath);

            isFileExists ?
                res.download(filePath) :
                res.status(404).send('File not found')

        } catch (e) {
            errorHandler(e, res)
        }
    })
};

const checkFileExists = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(err === null)
        });
    });
};

module.exports = downloadFile;

// const requestZipFileRouter = (app, dbConnection, sourceDir, targetDir) => {
//     app.get(url.requestZip, async (req, res) => {
//         try {
//             let IDs = getID(req);
//             if (IDs !== null) {
//                 // searching by ID
//                 const areIDValidate = validateID(IDs, res);
//                 if (!areIDValidate) return;
//             } else {
//                 // searching by filter
//                 const where = getQueryStringWherePart(req, res);
//                 if (where === null) return;
//
//                 const queryString= `SELECT * FROM ${process.env.DB_TABLE} ${where}`;
//                 const result = await queryDB(dbConnection, queryString);
//                 IDs = result.map(row => row.id);
//             }
//
//             const {filename, size} = await getZipFiles(IDs, sourceDir, targetDir);
//             res.json({
//                 status: 'OK',
//                 data: {
//                     filename,
//                     size
//                 }
//             })
//         } catch (e) {
//             errorHandler(e, res);
//         }
//     })
// };
