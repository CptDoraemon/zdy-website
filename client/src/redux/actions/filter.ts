export enum FilterActionType {
    'ALTER_PENDING_FILTER'='ALTER_PENDING_FILTER',
    'APPLY_PENDING_FILTER'='APPLY_PENDING_FILTER',
    'RESET_ALL_FILTER'='RESET_ALL_FILTER'
}

export type FilterActions =
    ReturnType<typeof alterPendingFilter> |
    ReturnType<typeof applyPendingFilter> |
    ReturnType<typeof resetAllFilter>;

export const alterPendingFilter = (filterName: string, optionName: string, value: any) => {
    return {
        type: FilterActionType.ALTER_PENDING_FILTER as typeof FilterActionType.ALTER_PENDING_FILTER,
        filterName,
        optionName,
        value
    }
};

export const applyPendingFilter = () => {
    return {
        type: FilterActionType.APPLY_PENDING_FILTER as typeof FilterActionType.APPLY_PENDING_FILTER,
    }
};

export const resetAllFilter = () => {
    return {
        type: FilterActionType.RESET_ALL_FILTER as typeof FilterActionType.RESET_ALL_FILTER
    }
};
