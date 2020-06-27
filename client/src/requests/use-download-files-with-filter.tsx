import URLs from "./urls";
import useGet from "./use-get";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import {cloneDeep} from "lodash";
import {defaultFilters} from "../redux/types/filter";
import filterToQueryParam from "./helpers/filter-to-query-param";


interface ResponseType {
    requested: boolean
}

const useDownloadFilesWithFilter = () => {
    const state = useStore<State>();
    const defaultFilter = cloneDeep(defaultFilters);
    const url = URLs.downloadFilesWithFilter;
    const {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doGet
    } = useGet<ResponseType>();

    const doRequest = () => {
        const queryParams = filterToQueryParam(cloneDeep(state.getState().filter.active), defaultFilter);
        doGet(queryParams.length === 0 ? url : url + '?' + queryParams)
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doRequest
    }
};

export default useDownloadFilesWithFilter;
