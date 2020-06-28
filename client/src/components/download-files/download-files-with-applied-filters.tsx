import React, {useState} from "react";
import useButtonStyles from "./download-button-styles"
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import useDownloadFilesWithFilter from "../../requests/use-download-files-with-filter";

interface DownloadFilesWithAppliedFiltersProps {

}

const DownloadFilesWithAppliedFilters: React.FC<DownloadFilesWithAppliedFiltersProps> = () => {
    const classes = useButtonStyles();
    const {
        loading,
        error,
        errorMessage,
        data,
        resetData,
        doRequest
    } = useDownloadFilesWithFilter();

    const [dialog, setDialog] = useState(false);
    const toggleDialog = () => {
        setDialog(!dialog)
    };
    const closeDialog = () => {
        setDialog(false);
    };

    const requestConfirmed = data && data.requested;

    return (
        <>
            <Button variant="contained" color="primary" disableElevation onClick={toggleDialog} classes={{root: classes.root}}>
                Download All
            </Button>
            <Dialog onClose={closeDialog} onExited={resetData} aria-labelledby="download-files-by-id-dialog-title" open={dialog}>
                <DialogTitle id="download-files-by-id-dialog-title">
                    Notice
                    <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {
                    requestConfirmed ?
                        <DialogContent classes={{dividers: classes.dialogContentExtraPadding}} dividers>
                            <p>
                                We are preparing your file.
                            </p>
                            <p>
                                You can track the progress and download your file once it's ready in the download status tab.
                            </p>
                        </DialogContent> :
                        <DialogContent classes={{dividers: classes.dialogContentExtraPadding}} dividers>
                            <p>
                                You are requesting to download all the files with the applied filters, the file size can be large and we need time to prepare it.
                            </p>
                            <p>
                                You can track the progress and download your file once it's ready in the download status tab.
                            </p>
                            <p>
                                Please click the button below to confirm the request.
                            </p>
                        </DialogContent>
                }
                <DialogActions>
                    {
                        error ?
                            'Server Error' :
                            requestConfirmed ?
                            <Button variant="contained" color="primary" disableElevation onClick={closeDialog}>
                                Close
                            </Button> :
                            <Button variant="contained" color="primary" disableElevation onClick={doRequest} disabled={loading}>
                                {
                                    loading ?
                                        'Processing' :
                                        'Confirm'
                                }
                            </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DownloadFilesWithAppliedFilters
