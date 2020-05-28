import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const Table: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
};

export default Table
