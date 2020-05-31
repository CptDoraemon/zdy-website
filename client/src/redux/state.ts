import {FilterState, defaultFilterState} from "./types/filter";
import { cloneDeep } from 'lodash';
import { defaultTableSortState, TableSort } from './types/table-sort';

export interface State {
    filter: FilterState
    tableSort: TableSort
}

const defaultState: State = {
    filter: cloneDeep(defaultFilterState),
    tableSort: cloneDeep(defaultTableSortState)
};

export default defaultState
