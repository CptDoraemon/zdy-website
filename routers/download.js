const url = require('./URLs');

/**
 * download file from s3 by given filename
 * /api/download?filename=example.zip
 */
const downloadFile = (app, S3Details) => {
    app.get(url.downloadFile, async (req, res) => {
        try {
            let filename = req.query.filename;

            filename = decodeURIComponent(filename);
            // const params = {Bucket: S3Details.bucket, Key: `${S3Details.download}/${filename}`, Expires: 86400};
            // const preSignedUrl = await S3Details.s3.getSignedUrlPromise('getObject', params);
            const imageUrl = `https://${S3Details.bucket}.s3.amazonaws.com/${S3Details.download}/${filename}`;
            res.redirect(imageUrl)
        } catch (e) {
            console.log(e);
            res.status(404).send('File not found')
        }
    })
};

module.exports = downloadFile;
