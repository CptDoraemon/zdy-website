import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetFileQueueStatus from "../../requests/use-file-queue-status";
import CircularProgress from "@material-ui/core/CircularProgress";
import DownloadStatusTable from "./download-status-table";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    title: {
        margin: theme.spacing(2, 0),
        fontWeight: 700
    },
    loading: {
        width: '100%',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const DownloadStatus: React.FC = () => {
    const classes = useStyles();

    const {
        loading,
        error,
        errorMessage,
        data,
        getData
    } = useGetFileQueueStatus();

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                If you requested a large file earlier, you can track its status here.
            </div>
            {
                loading &&
                <div className={classes.loading}>
                    <CircularProgress disableShrink/>
                </div>
            }
            {
                error &&
                <div className={classes.loading}>
                    { errorMessage }
                </div>
            }
            {
                data !== null && data.length === 0 &&
                <div className={classes.loading}>
                    No task found
                </div>
            }
            {
                data !== null && data.length > 0 &&
                <DownloadStatusTable data={data}/>
            }
        </div>
    )
};

export default DownloadStatus
