import URLs from "./urls";
import useGet from "./use-get";
import {useEffect, useState} from "react";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getTimeString = (ISOString: string) => {
    const date = new Date(ISOString);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} - ${hour}:${minute}`
};

interface DataType {
    queue: {
        key: string,
        status: string,
        requestedAt: string,
        size: string,
        filename: string,
    }[],
}

type ProcessedData = {
    key: string,
    status: string,
    requestedAt: string,
    size: string,
    url: string,
}[] | null

const useGetFileQueueStatus= () => {
    const url = URLs.getFileQueueStatus;
    const {
        loading,
        error,
        errorMessage,
        data,
        doGet
    } = useGet<DataType>();

    const [processedData, setProcessedData] = useState<ProcessedData>(null);

    useEffect(() => {
        if (data === null) return;
        setProcessedData(data.queue.map((obj) => {
            return {
                key: obj.key,
                status: obj.status,
                requestedAt: getTimeString(obj.requestedAt),
                size: obj.size,
                url: obj.filename === '' ? '' : URLs.downloadFile(obj.filename),
            }
        }));
    }, [data]);

    const getData = () => {
        doGet(url);
    };

    return {
        loading,
        error,
        errorMessage,
        data: processedData as ProcessedData,
        getData
    }
};

export default useGetFileQueueStatus;
