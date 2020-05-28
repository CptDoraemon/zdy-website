import {Filters} from "../types/filter";

export enum FilterActionType {
    'ALTER_AGE_FILTER'='ALTER_AGE_FILTER',
    'ALTER_GENDER_FILTER'='ALTER_GENDER_FILTER',
    'ALTER_SEVERITY_FILTER'='ALTER_SEVERITY_FILTER',
    'ALTER_DEATH_FILTER'='ALTER_DEATH_FILTER',
    'RESET_ALL_FILTER'='RESET_ALL_FILTER'
}

export type FilterActions =
    ReturnType<typeof alterAgeFilter> |
    ReturnType<typeof alterGenderFilter> |
    ReturnType<typeof alterDeathFilter> |
    ReturnType<typeof alterSeverityFilter> |
    ReturnType<typeof resetAllFilter>;

export const alterAgeFilter = (value: Filters['age']) => {
    return {
        type: FilterActionType.ALTER_AGE_FILTER as typeof FilterActionType.ALTER_AGE_FILTER,
        value
    }
};

export const alterGenderFilter = (value: Filters['gender']) => {
    return {
        type: FilterActionType.ALTER_GENDER_FILTER as typeof FilterActionType.ALTER_GENDER_FILTER,
        value
    }
};

export const alterDeathFilter = (value: Filters['death']) => {
    return {
        type: FilterActionType.ALTER_DEATH_FILTER as typeof FilterActionType.ALTER_DEATH_FILTER,
        value
    }
};

export const alterSeverityFilter = (value: Filters['severity']) => {
    return {
        type: FilterActionType.ALTER_SEVERITY_FILTER as typeof FilterActionType.ALTER_SEVERITY_FILTER,
        value
    }
};

export const resetAllFilter = () => {
    return {
        type: FilterActionType.RESET_ALL_FILTER as typeof FilterActionType.RESET_ALL_FILTER
    }
};
