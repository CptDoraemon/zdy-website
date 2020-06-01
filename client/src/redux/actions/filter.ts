import {alterTableSortCurrentPage} from "./table-sort";
import defaultState, {State} from "../state";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export enum FilterActionType {
    'ALTER_PENDING_FILTER'='ALTER_PENDING_FILTER',
    'APPLY_PENDING_FILTER'='APPLY_PENDING_FILTER',
    'RESET_ALL_FILTER'='RESET_ALL_FILTER'
}

export type FilterActions =
    ReturnType<typeof alterPendingFilter> |
    ReturnType<typeof _applyPendingFilter> |
    ReturnType<typeof resetAllFilter>;

export const alterPendingFilter = (filterName: string, optionName: string, value: any) => {
    return {
        type: FilterActionType.ALTER_PENDING_FILTER as typeof FilterActionType.ALTER_PENDING_FILTER,
        filterName,
        optionName,
        value
    }
};

const _applyPendingFilter = () => {
    return {
        type: FilterActionType.APPLY_PENDING_FILTER as typeof FilterActionType.APPLY_PENDING_FILTER,
    }
};

export const applyPendingFilter = () => {
    // need to reset page after new filter is applied
    return (dispatch: any) => {
        dispatch(_applyPendingFilter);
        dispatch(alterTableSortCurrentPage(defaultState.tableSort.currentPage))
    }
};

export const resetAllFilter = () => {
    return {
        type: FilterActionType.RESET_ALL_FILTER as typeof FilterActionType.RESET_ALL_FILTER
    }
};
