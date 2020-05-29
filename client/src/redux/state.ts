import {FilterState, defaultFilterState} from "./types/filter";

export interface State {
    filter: FilterState
}

const defaultState: State = {
    filter: {
        active: {...defaultFilterState.active},
        pending: {...defaultFilterState.active},
        isPendingChanged: false,
        isActiveApplied: false
    }
};

export default defaultState
