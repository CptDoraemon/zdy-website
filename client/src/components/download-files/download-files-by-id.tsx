import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import useButtonStyles from "./download-button-styles"
import useDownloadFilesById from "../../requests/use-download-files-by-id";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

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


interface DownloadFilesByIdProps {
    list: string[],
}

const DownloadFilesById: React.FC<DownloadFilesByIdProps> = ({list}) => {
    const classes = useButtonStyles();
    const {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doRequest
    } = useDownloadFilesById();
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        if (data !== null) {
            setDialog(true)
        }
    }, [data]);

    const sendRequest = () => {
        doRequest(list)
    };

    const closeDialog = () => {
        resetData();
        setDialog(false)
    };

    const downloadLinkBase = process.env.REACT_APP_DEBUG === 'true' ?
        'http://localhost:5000/' :
        '/';

    if (error) {
        return (
            <div>
                Server Error
            </div>
        )
    } else {
        return (
            <>
                <Button variant="contained" color="primary" disableElevation onClick={sendRequest} classes={{root: classes.root}} disabled={loading}>
                    {
                        loading ? 'Processing' : 'Download Selected'
                    }
                </Button>
                <Dialog onClose={closeDialog} aria-labelledby="download-files-by-id-dialog-title" open={dialog} classes={{paper: classes.dialogRoot}}>
                    <DialogTitle id="download-files-by-id-dialog-title">
                        File Ready
                        <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers className={classes.dialogContent}>
                        <div>
                            Your file is ready
                        </div>
                        <div>
                            {`File size: ${getFileSize(data?.size || 0)}`}
                        </div>
                        <div>
                            <a href={`${downloadLinkBase}${data?.filepath}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                Click here to download
                            </a>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
};

export default DownloadFilesById
