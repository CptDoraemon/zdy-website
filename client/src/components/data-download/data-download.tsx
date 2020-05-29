import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DataFilter from "../data-filter/data-filter";
import useGetData from "../../requests/use-get-data";
import {CircularProgress} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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
        justifyContent: 'center'
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
    } = useGetData();

    console.log(data);

    useEffect(() => {
        getData()
    }, []);

    console.log(data);

    return (
        <div className={classes.root}>

            <DataFilter
                callBackOnFilterApplied={getData}
                disabled={loading}
            />

            {
                loading &&
                <div className={classes.centering}>
                    <CircularProgress />
                </div>
            }
            {
                error &&
                <div className={classes.centering}>
                    { errorMessage }
                </div>
            }
            {
                !loading && !error && Array.isArray(data) && !data.length &&
                <div className={classes.centering}>
                    No entries found with applied filters
                </div>
            }
            {
                !loading && !error && Array.isArray(data) && data.length > 0 &&
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    Object.keys(data[0]).map((key, i) => (
                                        i === 0 ?
                                            <TableCell key={i}> { key } </TableCell> :
                                            <TableCell key={i} align="right"> { key } </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((row, i) => (
                                    <TableRow key={i}>
                                        { Object.values(row).map((value, i) => (
                                            i === 0 ?
                                                <TableCell component="th" scope="row" key={i}>{value}</TableCell> :
                                                <TableCell align="right" key={i}>{value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    )
};

export default DataDownload
