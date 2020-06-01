import React, {useEffect, useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import useRequestZipFile from "../../requests/use-request-zip-file";
import useDownloadFile from "../../requests/use-download-file";

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

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200
    },
    fileReady: {
        minWidth: 200,
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.success.light,
        }
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        '&:link': {
            textDecoration: 'underline'
        },
        '&:visited': {
            textDecoration: 'underline'
        }
    },
    message: {
        width: '100%',
        textAlign: 'right',
        padding: theme.spacing(1)
    }
}));

interface CaseDetailProps {
    list: string[]
}

const DownloadButton: React.FC<CaseDetailProps> = ({list}) => {
    const classes = useStyles();
    const zip = useRequestZipFile();
    const file = useDownloadFile();

    useEffect(() => {
        // reset when selection is changed
        zip.resetData();
        file.reset()
    }, [list]);

    const fileSizeString = useMemo(() => {
        return zip.data ?
            getFileSize(parseInt(zip.data.size)) :
            ''
    }, [zip.data]);

    const clickToRequestZip = () => {
        zip.doRequest(list)
    };
    const clickToDownload = () => {
        if (zip.data?.filename) {
            file.doDownload(zip.data.filename)
        }
    };

    if (zip.error && zip.errorMessage) {
        return (
            <div className={classes.message}>
                Server error
            </div>
        )
    } else if (zip.data) {
        // zip file is ready
        if (!file.downloaded) {
            return (
                <Button variant="contained" className={classes.fileReady} disableElevation onClick={clickToDownload}>
                    {`File Ready (${fileSizeString})`}
                </Button>
            )
        } else {
            return (
                <div className={classes.message}>
                    {'Your download should begin shortly. If it\'s not starting, '}
                    <a href={file.getDownloadURL(zip.data?.filename)} target='_blank' className={classes.link} rel={'noreferrer noopener'}>click here</a>
                    {'.'}
                </div>
            )
        }
    } else return (
        // not request to generate zip file yet
        <Button variant="contained" color="primary" disableElevation onClick={clickToRequestZip} className={classes.root} disabled={zip.loading}>
            {
                zip.loading ? 'Processing' :
                list.length > 0 ? 'Download Selected' : 'Download All'
            }
        </Button>
    )
};

export default DownloadButton
