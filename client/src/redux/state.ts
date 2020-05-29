import {FilterState, defaultFilterState} from "./types/filter";
import { cloneDeep } from 'lodash'
import {defaultDownloadableDataState, DownloadableDataState} from "./types/downloadableDataState";

export interface State {
    filter: FilterState
    downloadableData: DownloadableDataState
}

const defaultState: State = {
    filter: cloneDeep(defaultFilterState),
    downloadableData: cloneDeep(defaultDownloadableDataState),
};

export default defaultState
