const archiver = require('archiver');
const streamLibrary = require('stream');

const generateZipInS3 = (IdArray, S3Detail) => {
    return new Promise((resolve, reject) => {
        const s3 = S3Detail.s3;
        const SOURCE_FOLDER = S3Detail.original;
        const TARGET_FOLDER = S3Detail.download;
        const BUCKET = S3Detail.bucket;
        const filename = `data-download-${Date.now().toString(36)}.zip`;
        const stream = new streamLibrary.PassThrough();
        const uploadBucketKey = {Bucket: BUCKET, Key: `${TARGET_FOLDER}/${filename}`};
        const uploadParam = {
            ...uploadBucketKey,
            Body: stream
        };

        const zip = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        zip.on('warning', (e) => {
            console.log(e);
        });

        zip.on('error', (e) => {
            console.log(e);
            reject(e)
        });

        zip.pipe(stream);

        s3.upload(uploadParam, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
                return
            }
            s3.headObject(uploadBucketKey, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return
                }
                resolve({
                    filename,
                    size: data.ContentLength
                })
            });
        });

        IdArray.forEach((id) => {
            const params = {Bucket: BUCKET, Key: `${SOURCE_FOLDER}/${id}.jpg`};
            const objectReadStream = s3.getObject(params).createReadStream();
            zip.append(objectReadStream, {name: `${id}.jpg`});
        });
        zip.finalize();
    })
};

module.exports = generateZipInS3;
