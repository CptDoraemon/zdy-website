const url = require('./URLs').getCaseDetail;
const errorHandler = require('../common/errors/error-handler');
const queryDB = require('../common/query-db');
const Joi = require('@hapi/joi');

const idSchema = Joi.object({
    id: Joi.number().integer().required()
});

/**
 * /api/get-case-detail?id=1
 */
const getCaseDetail = (app, dbConnection, S3Details) => {
    app.get(url, async (req, res) => {
        try {
            // validate id query param
            const idValidation = idSchema.validate({id: req.query.id});
            if (idValidation.error) {
                res.json({
                    status: 'error',
                    message: idValidation.error.details[0].message
                });
                return
            }
            const id = idValidation.value.id;

            // query database
            const queryString = `SELECT * FROM ${process.env.DB_TABLE} WHERE id=${id}`;
            const tableData = await queryDB(dbConnection, queryString);
            const row = tableData[0];
            if (!row) {
                // no entry found with given id
                res.json({
                    status: 'error',
                    message: 'No record found with given ID'
                });
                return
            }

            // get image
            const imageUrl = `https://${S3Details.bucket}.s3.amazonaws.com/${S3Details.original}/${id}.jpg`;

            // normal response
            res.json({
                status: 'OK',
                data: {
                    id: row.id,
                    sex: row.sex,
                    age: row.age,
                    image: imageUrl
                }
            });
        } catch (e) {
            errorHandler(e, res);
        }
    })
};

module.exports = getCaseDetail;
