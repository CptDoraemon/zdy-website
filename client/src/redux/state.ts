import { Filters } from "./types/filter";

export interface State {
    filter: Filters
}

const state: State = {
    filter: {
        death: null,
        gender: null,
        age: null,
        severity: null,
    }
};

export default state
