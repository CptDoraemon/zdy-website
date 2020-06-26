import {TableSort} from "../../redux/types/table-sort";

const sortToQueryParam = (sortState: TableSort) => {
    return `sortBy=${sortState.sortBy}&sortOrder=${sortState.sortOrder}&rowPerPage=${sortState.rowPerPage}&page=${sortState.currentPage}`;
};

export default sortToQueryParam
