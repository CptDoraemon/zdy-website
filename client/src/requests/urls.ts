const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
    'http://localhost:5000/api' :
    '/api';

const URLs = {
    getDataURL: baseURL + '/get-data',
    getCaseDetail: baseURL + '/get-case-detail',
    downloadFilesById: baseURL + '/get-files-by-id'
};

export default URLs
