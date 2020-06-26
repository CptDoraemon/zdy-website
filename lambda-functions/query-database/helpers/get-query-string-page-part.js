const rowPerPageOptions = [
    '20',
    '50',
    '100'
];

/**
 * return a string like
 * LIMIT 20 OFFSET 20
 */
const getQueryStringPagePart = (req, rowPerPage) => {
    const page = req.query.page;
    let offset = '';

    if (page !== undefined) {
        const _page = parseInt(page);
        if (!isNaN(_page) && _page >= 1) {
            offset = parseInt(rowPerPage) * (_page - 1)
        }
    }

    return offset.length === 0 ?
        `LIMIT ${rowPerPage}` :
        `LIMIT ${rowPerPage} OFFSET ${offset}`
};

const getRowPerPage = (req) => {
    const rowPerPage = req.query.rowPerPage;
    let result = '20';

    if (rowPerPage !== undefined) {
        const _rowPerPage = rowPerPage.toString().toLowerCase();
        if (rowPerPageOptions.indexOf(_rowPerPage) !== -1) {
            result = _rowPerPage
        }
    }

    return parseInt(result)
};

module.exports = {
    getQueryStringPagePart,
    getRowPerPage
};
