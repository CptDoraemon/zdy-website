import URLs from "./urls";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import useGet from "./use-get";
import filterToQueryParam from "./helpers/filter-to-query-param";
import {cloneDeep} from "lodash";
import {defaultFilters} from "../redux/types/filter";

interface ResponseType {
    filename: string,
    size: string
}

const useRequestZipFile = () => {
    const state = useStore<State>();
    const defaultFilter = cloneDeep(defaultFilters);
    const url = '';
    const {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doGet
    } = useGet<ResponseType>();

    const doRequest = (idArray?: string[]) => {
        if (idArray && idArray.length > 0) {
            // download by ID
            doGet(url + `?id=${idArray.join(',')}`)
        } else {
            // download with filter
            const queryParams = filterToQueryParam(cloneDeep(state.getState().filter.active), defaultFilter);
            doGet(queryParams.length === 0 ? url : url + '?' + queryParams)
        }
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

export default useRequestZipFile;
