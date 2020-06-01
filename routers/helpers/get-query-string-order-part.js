const sortByOptions = [
    'id',
    'sex',
    'age',
    'death',
    'severity'
];

const sortOrderOptions = [
    'ASC',
    'DESC'
];

/**
 * return a string like
 * ORDER BY column1 ASC|DESC;
 */
const getQueryStringOrderPart = (req) => {
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;

    const defaultColumn = 'id';
    let column = defaultColumn;
    let order = 'ASC';

    if (sortBy !== undefined) {
        const _sortBy = sortBy.toString().toLowerCase();
        if (sortByOptions.indexOf(_sortBy) !== -1) {
            column = _sortBy
        }
    }

    if (sortOrder !== undefined) {
        const _sortOrder = sortOrder.toString().toUpperCase();
        if (sortOrderOptions.indexOf(_sortOrder) !== -1) {
            order = _sortOrder
        }
    }

    // use default column as secondary sort when needed
    if (column === defaultColumn) {
        return `ORDER BY ${column} ${order}`
    } else {
        return `ORDER BY ${column}, ${defaultColumn} ${order}`
    }
};

module.exports = getQueryStringOrderPart;
