const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
    'http://localhost:3000/dev' :
    'https://i7lc6zt156.execute-api.us-east-1.amazonaws.com/dev';

const URLs = {
    getDataURL: baseURL + '/query-database',
    requestZipFile: baseURL + '/request-zip',
    downloadFile: baseURL + '/download',
    getCaseDetail: baseURL + '/get-case-detail'
};

export default URLs
