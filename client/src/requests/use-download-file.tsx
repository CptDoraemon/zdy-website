import URLs from "./urls";
import {useState} from "react";

const useDownloadFile = () => {
    const url = URLs.downloadFile;
    const [downloaded, setDownloaded] = useState(false);

    const getDownloadURL = (filename: string) => {
        return url + `?filename=${encodeURIComponent(filename)}`;
    };

    const reset = () => {
        setDownloaded(false)
    };

    const doDownload = (filename: string) => {
        const urlWithQueryParam = getDownloadURL(filename);

        let link: HTMLAnchorElement | null = document.createElement("a");
        link.href = urlWithQueryParam;
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        document.body.appendChild(link);
        link.click();
        link.remove();
        link = null;

        setDownloaded(true);
    };

    return {
        downloaded,
        reset,
        doDownload,
        getDownloadURL
    }
};

export default useDownloadFile;
