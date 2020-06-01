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
const DEFAULT_SORT_COLUMN = 'id';
const DEFAULT_SORT_ORDER = 'ASC';
const getQueryStringOrderPart = (req) => {
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;

    let column = DEFAULT_SORT_COLUMN;
    let order = DEFAULT_SORT_ORDER;

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

    if (column === DEFAULT_SORT_COLUMN) {
        // default column used as the only sort
        return `ORDER BY ${column} ${order}`
    } else {
        // when primary sort is other than default column
        // use default column as secondary sort, and by default sort order
        return `ORDER BY ${column} ${order}, ${DEFAULT_SORT_COLUMN} ${DEFAULT_SORT_ORDER}`
    }
};

module.exports = getQueryStringOrderPart;
