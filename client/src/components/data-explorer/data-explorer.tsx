import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const DataExplorer: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            123
        </div>
    )
};

export default DataExplorer
