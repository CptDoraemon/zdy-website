import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DataFilter from "../data-filter/data-filter";
import Table from "./table";
import EnhancedTable from "../table/table";


const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const DataDownload: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DataFilter />
            <EnhancedTable/>
        </div>
    )
};

export default DataDownload
