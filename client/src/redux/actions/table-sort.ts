import {TableSortBy, TableSortOrder, TableSortRowPerPage} from "../types/table-sort";

export enum TableSortActionType {
    'ALTER_TABLE_SORT_BY'='ALTER_TABLE_SORT_BY',
    'ALTER_TABLE_SORT_ORDER'='ALTER_TABLE_SORT_ORDER',
    'ALTER_TABLE_SORT_ROW_PER_PAGE'='ALTER_TABLE_SORT_ROW_PER_PAGE',
    'ALTER_TABLE_SORT_CURRENT_PAGE'='ALTER_TABLE_SORT_CURRENT_PAGE',
}

export type TableSortActions =
    ReturnType<typeof alterTableSortBy> |
    ReturnType<typeof alterTableSortOrder> |
    ReturnType<typeof alterTableSortRowPerPage> |
    ReturnType<typeof alterTableSortCurrentPage>;

export const alterTableSortBy = (value: TableSortBy) => {
    return {
        type: TableSortActionType.ALTER_TABLE_SORT_BY as typeof TableSortActionType.ALTER_TABLE_SORT_BY,
        value
    }
};

export const alterTableSortOrder = (value: TableSortOrder) => {
    return {
        type: TableSortActionType.ALTER_TABLE_SORT_ORDER as typeof TableSortActionType.ALTER_TABLE_SORT_ORDER,
        value
    }
};

export const alterTableSortRowPerPage = (value: TableSortRowPerPage) => {
    return {
        type: TableSortActionType.ALTER_TABLE_SORT_ROW_PER_PAGE as typeof TableSortActionType.ALTER_TABLE_SORT_ROW_PER_PAGE,
        value
    }
};

export const alterTableSortCurrentPage = (value: number) => {
    return {
        type: TableSortActionType.ALTER_TABLE_SORT_CURRENT_PAGE as typeof TableSortActionType.ALTER_TABLE_SORT_CURRENT_PAGE,
        value
    }
};

