import URLs from "./urls";
import {cloneDeep} from "lodash";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import {defaultFilters} from "../redux/types/filter";
import useGet from "./use-get";
import filterToQueryParam from "./helpers/filter-to-query-param";
import sortToQueryParam from "./helpers/sort-to-query-param";

interface DataType {
    tableData: {[key: string]: any}[],
    totalPages: number
}

const useGetTableData = () => {
    const state = useStore<State>();
    const defaultFilter = cloneDeep(defaultFilters);
    const url = URLs.getDataURL;
    const {
        loading,
        error,
        errorMessage,
        data,
        doGet
    } = useGet<DataType>();

    const getData = () => {
        const _state = cloneDeep(state.getState());
        const filterQueryParams = filterToQueryParam(_state.filter.active, defaultFilter);
        let _url = url + '?' + sortToQueryParam(_state.tableSort);
        if (filterQueryParams.length > 0) {
            _url = _url + '&' + filterQueryParams
        }
        console.log(_url);
        doGet(_url);
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
