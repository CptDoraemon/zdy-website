import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200
    }
}));

interface CaseDetailProps {
    text: string,
    list?: number[]
}

const DownloadButton: React.FC<CaseDetailProps> = ({text, list}) => {
    const classes = useStyles();

    const clickHandler = () => {
        console.log(list)
    };

    return (
        <Button variant="contained" color="primary" disableElevation onClick={clickHandler} className={classes.root}>
            { text }
        </Button>
    )
};

export default DownloadButton
