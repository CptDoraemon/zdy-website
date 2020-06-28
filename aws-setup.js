const AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
});

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-2'});

const S3Details = {
    s3,
    download: process.env.S3_DOWNLOAD_FOLDER_NAME,
    original: process.env.S3_ORIGINAL_FOLDER_NAME,
    bucket: process.env.S3_BUCKET,
};

module.exports = S3Details;
