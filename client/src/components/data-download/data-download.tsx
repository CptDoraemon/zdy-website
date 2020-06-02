import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DataFilter from "../data-filter/data-filter";
import useGetTableData from "../../requests/use-get-table-data";
import CircularProgress from "@material-ui/core/CircularProgress";
import DataTable from "../data-table/data-table";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    centering: {
        width: '100%',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            minHeight: 200,
        }
    },
    tableContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: theme.spacing(2),
        maxHeight: '800px',
        borderRadius: '5px'
    }
}));

interface DataDownloadProps {

}

const DataDownload: React.FC<DataDownloadProps> = ({}) => {
    const classes = useStyles();
    const {
        loading,
        error,
        errorMessage,
        data,
        getData
    } = useGetTableData();

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className={classes.root}>

            <DataFilter
                callBackOnFilterApplied={getData}
                disabled={loading}
            />

            {
                loading &&
                <div className={classes.centering}>
                    <CircularProgress disableShrink/>
                </div>
            }
            {
                error &&
                <div className={classes.centering}>
                    { errorMessage }
                </div>
            }
            {
                // loaded but no entry found
                !loading && !error && data !== null && data.tableData.length !== undefined && data.tableData.length === 0 &&
                <div className={classes.centering}>
                    No entries found with applied filters
                </div>
            }
            {
                // loaded and has data
                !loading && !error && data !== null && data.tableData.length !== undefined && data.tableData.length > 0 &&
                <DataTable data={data.tableData} totalPages={data.totalPages} title={'data'} refreshData={getData}/>
            }
        </div>
    )
};

export default DataDownload
