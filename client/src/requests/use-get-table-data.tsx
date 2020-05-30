import URLs from "./urls";
import {cloneDeep} from "lodash";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import {defaultFilters} from "../redux/types/filter";
import useGet from "./use-get";

interface DataType {
    [key: string]: any
}

const useGetTableData = () => {
    const filter = useStore<State>();
    const defaultFilter = cloneDeep(defaultFilters);
    const {
        loading,
        error,
        errorMessage,
        data,
        doGet
    } = useGet<DataType[]>();

    const getData = () => {
        const url = URLs.getDataURL(cloneDeep(filter.getState().filter.active), defaultFilter);
        doGet(url);
        console.log(url)
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
