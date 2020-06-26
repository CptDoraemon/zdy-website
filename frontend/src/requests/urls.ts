// const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
//     'http://localhost:5000/api' :
//     'https://hyitajby21.execute-api.us-east-2.amazonaws.com/test';
const baseURL = 'https://i7lc6zt156.execute-api.us-east-1.amazonaws.com/dev';

const URLs = {
    getDataURL: baseURL + '/query-database',
    requestZipFile: baseURL + '/request-zip',
    downloadFile: baseURL + '/download',
    getCaseDetail: baseURL + '/get-case-detail'
};

export default URLs
