const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;
const getFileSizeString = (size) => {
    let result = '';

    if (size < KB) {
        return `${result} Byte`
    } else if (size >= KB && size < MB) {
        result = `${(size / KB).toFixed(1)} KB`;
    } else if (size >= MB && size < GB) {
        result = `${(size / MB).toFixed(1)} MB`;
    } else if (size >= GB) {
        result = `${(size / GB).toFixed(1)} GB`
    }

    return result
};

module.exports = getFileSizeString;
