import {isEqual} from "lodash";
import {Filters} from "../../redux/types/filter";

const filterToQueryParam = (filter: Filters, defaultFilter: Filters) => {
    const params = [];

    if (!isEqual(filter.sex, defaultFilter.sex)) {
        const array = [];
        if (filter.sex.male) {
            array.push(1)
        }
        if (filter.sex.female) {
            array.push(2)
        }

        if (array.length) {
            params.push(`sex=${array.join(',')}`)
        }
    }

    if (!isEqual(filter.death, defaultFilter.death)) {
        const array = [];
        if (filter.death.yes) {
            array.push(1)
        }
        if (filter.death.no) {
            array.push(0)
        }

        if (array.length) {
            params.push(`death=${array.join(',')}`);
        }
    }

    if (!isEqual(filter.severity, defaultFilter.severity)) {
        const array = [];
        if (filter.severity['1']) {
            array.push(1)
        }
        if (filter.severity['2']) {
            array.push(2)
        }
        if (filter.severity['3']) {
            array.push(3)
        }

        if (array.length) {
            params.push(`severity=${array.join(',')}`);
        }
    }

    if (!isEqual(filter.age, defaultFilter.age)) {
        params.push(`ageMin=${filter.age.min}`);
        params.push(`ageMax=${filter.age.max}`);
    }

    return params.length === 0 ?
        '' :
        params.join('&')
};

export default filterToQueryParam
