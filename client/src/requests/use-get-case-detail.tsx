import URLs from "./urls";
import useGet from "./use-get";

interface DataType {
    id: string,
    sex: string,
    age: string,
    image: string
}

const useGetCaseDetail = () => {
    const url = URLs.getCaseDetail;
    const {
        loading,
        error,
        errorMessage,
        data,
        doGet
    } = useGet<DataType>();

    const getData = (id: string) => {
        doGet(`${url}?id=${id}`);
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        getData
    }
};

export default useGetCaseDetail;
