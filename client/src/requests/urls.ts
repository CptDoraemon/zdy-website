import {Filters} from '../redux/types/filter';
import { isEqual } from 'lodash'

const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
    'http://localhost:5000/api' :
    '/api';

const getDataURL = (filter: Filters, defaultFilter: Filters) => {
    let url = baseURL + '/get-data';
    const params = [];

    if (!isEqual(filter.gender, defaultFilter.gender)) {
        const array = [];
        if (filter.gender.male) {
            array.push(1)
        }
        if (filter.gender.female) {
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
        url :
        url + '?' + params.join('&')
};

const URLs = {
    getDataURL
};

export default URLs
