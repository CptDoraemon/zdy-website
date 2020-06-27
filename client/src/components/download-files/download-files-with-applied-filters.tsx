import React, {useState} from "react";
import useButtonStyles from "./download-button-styles"
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

interface DownloadFilesWithAppliedFiltersProps {

}

const DownloadFilesWithAppliedFilters: React.FC<DownloadFilesWithAppliedFiltersProps> = () => {
    const classes = useButtonStyles();

    const [dialog, setDialog] = useState(false);
    const toggleDialog = () => {
        setDialog(!dialog)
    };
    const closeDialog = () => {
        setDialog(false)
    };

    return (
        <>
            <Button variant="contained" color="primary" disableElevation onClick={toggleDialog} classes={{root: classes.root}}>
                Download All
            </Button>
            <Dialog onClose={closeDialog} aria-labelledby="download-files-by-id-dialog-title" open={dialog} classes={{paper: classes.dialogRoot}}>
                <DialogTitle id="download-files-by-id-dialog-title">
                    Notice
                    <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <p>
                        Your are requesting to download all the files with the applied filters, the file size can be large and we need time to prepare it.
                    </p>
                    <p>
                        You can track the progress and download your file once it's ready in the download status tab.
                    </p>
                    <p>
                        Please click the button below to confirm the request.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" disableElevation onClick={() => false}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DownloadFilesWithAppliedFilters