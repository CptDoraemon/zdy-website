export enum TableSortBy {
    'ID'='ID',
    'SEX'='SEX',
    'DEATH'='DEATH',
    'AGE'='AGE',
    'SEVERITY'='SEVERITY'
}

export enum TableSortOrder {
    'ASC'='ASC',
    'DESC'='DESC',
}

export enum TableSortRowPerPage {
    'TWENTY' = 20,
    'FIFTY' = 50,
    'ONE_HUNDRED' = 100
}

export interface TableSort {
    sortBy: TableSortBy,
    sortOrder: TableSortOrder,
    rowPerPage: TableSortRowPerPage,
    currentPage: number,
    dense: boolean
}

export const defaultTableSortState: TableSort = {
    sortBy: TableSortBy.ID,
    sortOrder: TableSortOrder.ASC,
    rowPerPage: TableSortRowPerPage.TWENTY,
    currentPage: 1,
    dense: false
};
