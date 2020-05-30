const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
    'http://localhost:5000/api' :
    '/api';

const URLs = {
    getDataURL: baseURL + '/get-data',
    requestZipFile: baseURL + '/request-zip',
    downloadFile: baseURL + '/download'
};

export default URLs
