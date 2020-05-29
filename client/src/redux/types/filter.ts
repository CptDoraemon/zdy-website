export interface Filters {
    [key: string]: any,
    death: {
        yes: boolean,
        no: boolean,
    },
    gender: {
        male: boolean,
        female: boolean
    },
    severity: {
        '1': boolean,
        '2': boolean,
        '3': boolean
    },
    age: {
        min: number,
        max: number
    }
}

export interface FilterState {
    active: Filters,
    pending: Filters,
    isPendingChanged: boolean,
    isActiveApplied: boolean
}

export const defaultFilters: Filters = {
    death: {
        yes: true,
        no: true,
    },
    gender: {
        male: true,
        female: true
    },
    severity: {
        '1': true,
        '2': true,
        '3': true
    },
    age: {
        min: 0,
        max: 120
    }
};

export const defaultFilterState: FilterState = {
    active: {...defaultFilters},
    pending: {...defaultFilters},
    isPendingChanged: false,
    isActiveApplied: false
};
