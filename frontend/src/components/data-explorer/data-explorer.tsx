import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DataFilter from "../data-filter/data-filter";


const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const DataExplorer: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DataFilter />
        </div>
    )
};

export default DataExplorer
