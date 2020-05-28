import initState from "../state";
import {FilterActions, FilterActionType} from "../actions/filter";

function filter(state = initState.filter, actions: FilterActions) {
    switch(actions.type) {
        case FilterActionType.ALTER_AGE_FILTER:
            return Object.assign({}, state, {age: actions.value});
        case FilterActionType.ALTER_DEATH_FILTER:
            return Object.assign({}, state, {death: actions.value});
        case FilterActionType.ALTER_GENDER_FILTER:
            return Object.assign({}, state, {gender: actions.value});
        case FilterActionType.ALTER_SEVERITY_FILTER:
            return Object.assign({}, state, {severity: actions.value});
        case FilterActionType.RESET_ALL_FILTER:
            return Object.assign({}, initState.filter);
        default:
            return state
    }
}

export default filter;
