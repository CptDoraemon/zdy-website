import {useState} from "react";

const GENERIC_ERROR_MESSAGE = 'Sever is not available';

const useGet = <DataType,>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState<DataType | null>(null);

    const resetData = () => {
        setData(null)
    };

    const doGet = async (
        url: RequestInfo
    ) => {
        try {
            if (loading) return;
            // reset states
            setError(false);
            setErrorMessage('');

            // start fetching
            setLoading(true);
            const res = await fetch(url);
            const json = await res.json();

            // server responded
            setLoading(false);
            if (json.status === 'OK') {
                setData(json.data)
            } else if (json.status === 'error') {
                setError(true);
                setErrorMessage(json.message || GENERIC_ERROR_MESSAGE)
            }
            else {
                console.log(json);
                setError(true);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setError(true);
            setErrorMessage(GENERIC_ERROR_MESSAGE)
        }
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doGet
    }

};

export default useGet
