import defaultState from "../state";
import { cloneDeep } from 'lodash'
import {DownloadableDataActions, DownloadableDataActionsType} from "../actions/downloadableData";

function downloadableData(state = defaultState.downloadableData, actions: DownloadableDataActions) {
    switch(actions.type) {
        case DownloadableDataActionsType.GET_DOWNLOADABLE_DATA:
            return state

        default:
            return state
    }
}

export default downloadableData;
