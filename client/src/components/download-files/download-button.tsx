import React, {useEffect, useMemo} from "react";
import DownloadFilesById from "./download-files-by-id";
import DownloadFilesWithAppliedFilters from "./download-files-with-applied-filters";

const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;
const getFileSize = (size: number) => {
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

interface CaseDetailProps {
    list: string[],
}

const DownloadButton: React.FC<CaseDetailProps> = ({list}) => {
    if (list.length > 0) {
        // download selected items (download by id)
        return (
            <DownloadFilesById list={list}/>
        )
    } else {
        return (
            <DownloadFilesWithAppliedFilters/>
        )
    }

    // if (zip.error && zip.errorMessage) {
    //     return (
    //         <div className={classes.message}>
    //             Server error
    //         </div>
    //     )
    // } else if (zip.data) {
    //     // zip file is ready
    //     if (!file.downloaded) {
    //         return (
    //             <Button variant="contained" className={classes.fileReady} disableElevation onClick={clickToDownload}>
    //                 {`File Ready (${fileSizeString})`}
    //             </Button>
    //         )
    //     } else {
    //         return (
    //             <div className={classes.message}>
    //                 {'Your download should begin shortly. If it\'s not starting, '}
    //                 <a href={file.getDownloadURL(zip.data?.filename)} target='_blank' className={classes.link} rel={'noreferrer noopener'}>click here</a>
    //                 {'.'}
    //             </div>
    //         )
    //     }
    // } else return (
    //     // not request to generate zip file yet
    //     <Button variant="contained" color="primary" disableElevation onClick={clickToRequestZip} classes={{root: classes.root}} disabled={zip.loading}>
    //         {
    //             zip.loading ? 'Processing' :
    //             list.length > 0 ? 'Download Selected' : `Download All`
    //         }
    //     </Button>
    // )
};

export default DownloadButton
