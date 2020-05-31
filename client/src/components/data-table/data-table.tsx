import {makeStyles} from "@material-ui/core/styles";
import React, {useMemo} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import DataTableToolbar from "./data-table-toolbar";
import DataTableHead from "./data-table-head";
import {Link} from "react-router-dom";
import DataTableControls from "./data-table-controls";
import {Pagination} from "@material-ui/lab";
import {Dispatch} from "redux";
import {
    alterTableSortCurrentPage,
} from "../../redux/actions/table-sort";
import {State} from "../../redux/state";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
        maxHeight: 500,
    },
    moreInfo: {
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
    pagination: {
        padding: theme.spacing(2, 1)
    }
}));

interface EnhancedTableProps {
    data: {[key: string]: any}[],
    totalPages: number,
    title: string,
    refreshData: () => void,
    currentPage: number,
    changePage: (page: number) => void
}

const _DataTable: React.FC<EnhancedTableProps> = (
    {
        data,
        totalPages,
        title,
        refreshData,
        currentPage,
        changePage
    }) => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<number[]>([]);
    const [dense, setDense] = React.useState(false);

    const header = useMemo(() => {
        return Object.keys(data[0]);
    }, [data]);

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => parseInt(n.id));
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: number) => {
        let existed = false;
        const newSelected = selected.filter(_ => {
            if (_ === id) {
                existed = true;
                return false
            } else return true
        });

        if (!existed) {
            newSelected.push(id);
        }

        setSelected(newSelected);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const handleChangePage = (e: any, value: number) => {
        changePage(value);
        refreshData()
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <DataTableControls dense={dense} denseHandler={handleChangeDense} refreshData={refreshData}/>
                <DataTableToolbar selected={selected} title={title}/>
                <TableContainer className={classes.table}>
                    <Table
                        stickyHeader
                        size={dense ? 'small' : 'medium'}
                        aria-label="data table"
                    >
                        <DataTableHead
                            header={header}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {
                                data.map((row, i) => {
                                    const id = parseInt(row.id);
                                    const isItemSelected = isSelected(id);

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleClick(id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={i}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    // inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>

                                            {
                                                header.map((key, i) => (
                                                    i === 0 ?
                                                        <TableCell align="left" key={i}>{row[key]}</TableCell> :
                                                        <TableCell align="right" key={i}>{row[key]}</TableCell>
                                                ))
                                            }

                                            <TableCell
                                                align={'right'}
                                                padding={'default'}
                                            >
                                                <Link to={`/case-detail/${id}`} className={classes.moreInfo}>More Info</Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} color={'primary'} variant="outlined" shape="rounded" className={classes.pagination}/>
            </Paper>
        </div>
    );
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        changePage: (page: number) => dispatch(alterTableSortCurrentPage(page))
    }
}

function mapStateToProps(state: State) {
    return {
        currentPage: state.tableSort.currentPage
    }
}

const DataTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DataTable);

export default DataTable
