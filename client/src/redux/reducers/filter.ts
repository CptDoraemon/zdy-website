import defaultState from "../state";
import {FilterActions, FilterActionType} from "../actions/filter";
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

function filter(state = defaultState.filter, actions: FilterActions) {
    switch(actions.type) {
        case FilterActionType.ALTER_PENDING_FILTER:
            return (() => {
                const newState = cloneDeep(state);
                newState.pending[actions.filterName][actions.optionName] = actions.value;
                newState.isPendingChanged = true;
                return newState;
            })();

        case FilterActionType.APPLY_PENDING_FILTER:
            return (() => {
                const newState = cloneDeep(state);
                newState.active = cloneDeep(newState.pending);
                newState.isPendingChanged = false;
                newState.isActiveFilterSameAsDefault = isEqual(newState.active, defaultState.filter.active);
                return newState;
            })();

        case FilterActionType.RESET_ALL_FILTER:
            return cloneDeep(defaultState.filter);

        default:
            return state
    }
}

export default filter;
