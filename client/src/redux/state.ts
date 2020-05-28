import { Filters } from "./types/filter";

interface State {
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
