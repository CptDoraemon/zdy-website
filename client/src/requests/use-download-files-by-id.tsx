import URLs from "./urls";
import useGet from "./use-get";


interface ResponseType {
    filename: string,
    size: string
}

const useDownloadFilesById = () => {
    const url = URLs.downloadFilesById;
    const {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doGet
    } = useGet<ResponseType>();

    const doRequest = (idArray: string[]) => {
        doGet(url + `?id=${idArray.join(',')}`)
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doRequest
    }
};

export default useDownloadFilesById;
