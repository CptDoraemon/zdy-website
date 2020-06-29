const url = require('./URLs');
const ValidationError = require('../common/errors/validation-error');
const errorHandler = require('../common/errors/error-handler');
const getFileSizeString = require('../common/get-file-size-string');
const generateZipInS3 = require('../common/generate-zip-in-s3');

/**
 * request to generate Zip file by ID
 * /api/get-files-by-id?id=1,2,3
 */
const getFilesById = (app, S3Detail) => {
    app.get(url.getFilesById, async (req, res) => {
        try {
            let IDs = getID(req);
            validateID(IDs);

            // const {filename, size} = await getZipFiles(IDs, sourceDir, targetDir);
            const {filename, size} = await generateZipInS3(IDs, S3Detail);
            res.json({
                status: 'OK',
                data: {
                    filename,
                    size: getFileSizeString(size)
                }
            })
        } catch (e) {
            errorHandler(e, res);
        }
    })
};

/**
 * @param req
 * @returns {[]|*|string[]|*[]}
 */
const getID = (req) => {
    if (req.query.id !== undefined) {
        const value = req.query.id;
        return value.split(',');
    } else {
        return []
    }
};

/**
 * @param array {string[]} Array of IDs
 * throw ValidationError if any param is invalid
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
            throw new ValidationError('id values must be numbers, and separated by comma');
        }
    }
};

// /**
//  * @param IDArray {string[]} An array of IDs
//  * @param sourceDir {string} the path of input file directory
//  * @param targetDir {string} the path of zip file directory
//  */
// const getZipFiles = (IDArray, sourceDir, targetDir) => {
//     return new Promise((resolve, reject) => {
//         const zip = archiver('zip', {
//             zlib: { level: 9 } // Sets the compression level.
//         });
//         const fileName = `data-download-${Date.now().toString(36)}.zip`;
//         const outputDir = path.join(targetDir, fileName);
//         const output = fs.createWriteStream(outputDir);
//
//         output.on('close', () => {
//             resolve({
//                 filename: fileName,
//                 size: zip.pointer()
//             });
//         });
//
//         zip.on('warning', (e) => {
//             console.log(e);
//         });
//
//         zip.on('error', (e) => {
//             console.log(e);
//             reject(e)
//         });
//
//         zip.pipe(output);
//
//         IDArray.forEach(id => {
//             zip.file(path.join(sourceDir, `${id}.jpg`), {name: `${id}.jpg`})
//         });
//         zip.finalize();
//     });
// };

module.exports = getFilesById;
