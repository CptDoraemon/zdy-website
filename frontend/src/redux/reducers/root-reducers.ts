import {combineReducers} from "redux";
import filter from "./filter";
import tableSort from "./table-sort";

const rootReducers = combineReducers({
    filter,
    tableSort
});

export default rootReducers;
