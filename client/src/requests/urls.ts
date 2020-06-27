const baseURL = process.env.REACT_APP_DEBUG === 'true' ?
    'http://localhost:5000/api' :
    '/api';

const URLs = {
    getDataURL: baseURL + '/get-data',
    getCaseDetail: baseURL + '/get-case-detail',
    downloadFilesById: baseURL + '/get-files-by-id',
    downloadFilesWithFilter: baseURL + '/get-files-with-filter',
    downloadFile: (filename: string) => `${baseURL}/download-file?filename=${filename}`,
    getFileQueueStatus: baseURL + '/get-file-queue-status'
};

export default URLs
