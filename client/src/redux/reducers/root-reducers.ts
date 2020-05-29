import {combineReducers} from "redux";
import filter from "./filter";
import downloadableData from "./downloadableData"

const rootReducers = combineReducers({
    filter,
    downloadableData
});

export default rootReducers;
