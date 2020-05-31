import defaultState from "../state";
import { cloneDeep } from 'lodash'
import {TableSortActions, TableSortActionType} from "../actions/table-sort";

function tableSort(state = defaultState.tableSort, actions: TableSortActions) {
    switch(actions.type) {
        case TableSortActionType.ALTER_TABLE_SORT_BY:
            return (() => {
                const newState = cloneDeep(state);
                newState.sortBy = actions.value;
                return newState;
            })();

        case TableSortActionType.ALTER_TABLE_SORT_ORDER:
            return (() => {
                const newState = cloneDeep(state);
                newState.sortOrder = actions.value;
                return newState;
            })();

        case TableSortActionType.ALTER_TABLE_SORT_ROW_PER_PAGE:
            return (() => {
                const newState = cloneDeep(state);
                newState.rowPerPage = actions.value;
                newState.currentPage = defaultState.tableSort.currentPage;
                return newState;
            })();

        case TableSortActionType.ALTER_TABLE_SORT_CURRENT_PAGE:
            return (() => {
                const newState = cloneDeep(state);
                newState.currentPage = actions.value;
                return newState;
            })();

        case TableSortActionType.ALTER_TABLE_SORT_DENSE:
            return (() => {
                const newState = cloneDeep(state);
                newState.dense = !state.dense;
                return newState;
            })();

        default:
            return state
    }
}

export default tableSort;
