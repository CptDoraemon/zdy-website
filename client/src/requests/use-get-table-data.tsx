import URLs from "./urls";
import {cloneDeep} from "lodash";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import {defaultFilters} from "../redux/types/filter";
import useGet from "./use-get";
import filterToQueryParam from "./helpers/filter-to-query-param";

interface DataType {
    [key: string]: any
}

const useGetTableData = () => {
    const state = useStore<State>();
    const defaultFilter = cloneDeep(defaultFilters);
    const {
        loading,
        error,
        errorMessage,
        data,
        doGet
    } = useGet<DataType[]>();

    const getData = () => {
        const queryParams = filterToQueryParam(cloneDeep(state.getState().filter.active), defaultFilter);
        const url = URLs.getDataURL + queryParams;
        doGet(url);
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        getData
    }
};

export default useGetTableData;
