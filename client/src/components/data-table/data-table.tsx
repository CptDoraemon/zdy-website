import {makeStyles} from "@material-ui/core/styles";
import React, {useMemo} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DataTableToolbar from "./data-table-toolbar";
import DataTableHead from "./data-table-head";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    control: {
        margin: theme.spacing(2),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
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
    }
}));

interface EnhancedTableProps {
    data: {[key: string]: any}[],
    title: string
}

const DataTable: React.FC<EnhancedTableProps> = ({data, title}) => {
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

    const handleChangeDense = (event: any) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <FormControlLabel
                    className={classes.control}
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
                <DataTableToolbar numSelected={selected.length} title={title}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
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
                                                        <TableCell align="left">{row[key]}</TableCell> :
                                                        <TableCell align="right">{row[key]}</TableCell>
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
            </Paper>
        </div>
    );
};

export default DataTable
