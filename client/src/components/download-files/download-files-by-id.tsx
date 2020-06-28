import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import useButtonStyles from "./download-button-styles"
import useDownloadFilesById from "../../requests/use-download-files-by-id";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import URLs from "../../requests/urls";

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
        setDialog(false)
    };

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
                <Dialog onClose={closeDialog} onExited={resetData} aria-labelledby="download-files-by-id-dialog-title" open={dialog}>
                    <DialogTitle id="download-files-by-id-dialog-title">
                        File Ready
                        <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers classes={{dividers: classes.dialogContentExtraPadding}}>
                        <div>
                            Your file is ready
                        </div>
                        <div>
                            {`File size: ${data?.size || 0}`}
                        </div>
                        <div>
                            <a href={URLs.downloadFile(data?.filename || '')} target="_blank" rel="noopener noreferrer" className={classes.link}>
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
