import React, {ChangeEvent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Dispatch} from "redux";
import {State} from "../../redux/state";
import {connect} from "react-redux";
import {TableSortBy, TableSortOrder, TableSortRowPerPage} from "../../redux/types/table-sort";
import {
    alterTableSortBy,
    alterTableSortDense,
    alterTableSortOrder,
    alterTableSortRowPerPage
} from "../../redux/actions/table-sort";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
        borderBottom: 'solid 1px rgb(224, 224, 224)'
    },
    control: {
        margin: theme.spacing(1),
    },
    controlLabel: {
        fontSize: '0.8rem'
    },
    formControl: {
        minWidth: 150,
        margin: theme.spacing(1)
    },
    selectInput: {
        padding: '8px 12px',
        fontSize: '0.8rem'
    }
}));

interface DataTableControlsProps {
    dense: boolean,
    toggleDense: () => void,
    sortBy: TableSortBy,
    sortOrder: TableSortOrder,
    rowPerPage: TableSortRowPerPage,
    handleSortByChange: (value: TableSortBy) => void,
    handleSortOrderChange: (value: TableSortOrder) => void,
    handleSortRowPerPageChange: (value: TableSortRowPerPage) => void
    refreshData: () => void
}

const _DataTableControls: React.FC<DataTableControlsProps> = (
    {
        dense,
        toggleDense,
        sortBy, sortOrder,
        rowPerPage,
        handleSortByChange,
        handleSortOrderChange,
        handleSortRowPerPageChange,
        refreshData
    }) => {
    const classes = useStyles();

    const sortByChangeHandler = (e: any) => {
        handleSortByChange(e.target.value);
        refreshData()
    };

    const sortOrderChangeHandler = (e: any) => {
        handleSortOrderChange(e.target.value);
        refreshData();
    };

    const sortRowPerPageChangeHandler = (e: any) => {
        handleSortRowPerPageChange(e.target.value);
        refreshData();
    };

    return (
        <div className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="data-table-controls-sort-by">Sort By</InputLabel>
                <Select
                    id="data-table-controls-sort-by"
                    value={sortBy}
                    onChange={sortByChangeHandler}
                    label={'Sort By'}
                    inputProps={{
                        className: classes.selectInput
                    }}
                >
                    <MenuItem dense value={TableSortBy.ID}>ID</MenuItem>
                    <MenuItem dense value={TableSortBy.DEATH}>Death</MenuItem>
                    <MenuItem dense value={TableSortBy.SEX}>Sex</MenuItem>
                    <MenuItem dense value={TableSortBy.SEVERITY}>Severity</MenuItem>
                    <MenuItem dense value={TableSortBy.AGE}>Age</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="data-table-controls-sort-order">Sort Order</InputLabel>
                <Select
                    id="data-table-controls-sort-order"
                    value={sortOrder}
                    onChange={sortOrderChangeHandler}
                    label={'Sort Order'}
                    inputProps={{
                        className: classes.selectInput
                    }}
                >
                    <MenuItem dense value={TableSortOrder.ASC}>Ascending</MenuItem>
                    <MenuItem dense value={TableSortOrder.DESC}>Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="data-table-controls-sort-row-per-page">Row Per Page</InputLabel>
                <Select
                    id="data-table-controls-sort-row-per-page"
                    value={rowPerPage}
                    onChange={sortRowPerPageChangeHandler}
                    label={'Row Per Page'}
                    inputProps={{
                        className: classes.selectInput
                    }}
                >
                    <MenuItem value={TableSortRowPerPage.TWENTY} dense>20</MenuItem>
                    <MenuItem value={TableSortRowPerPage.FIFTY} dense>50</MenuItem>
                    <MenuItem value={TableSortRowPerPage.ONE_HUNDRED} dense>100</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                classes={{
                    root: classes.control,
                    label: classes.controlLabel
                }}
                control={<Switch checked={dense} onChange={toggleDense} />}
                label="Dense padding"
            />
        </div>
    )
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        handleSortByChange: (value: TableSortBy) => dispatch(alterTableSortBy(value)),
        handleSortOrderChange: (value: TableSortOrder) => dispatch(alterTableSortOrder(value)),
        handleSortRowPerPageChange: (value: TableSortRowPerPage) => dispatch(alterTableSortRowPerPage(value)),
        toggleDense: () => dispatch(alterTableSortDense())
    }
}

function mapStateToProps(state: State) {
    return {
        sortBy: state.tableSort.sortBy,
        sortOrder: state.tableSort.sortOrder,
        rowPerPage: state.tableSort.rowPerPage,
        dense: state.tableSort.dense
    }
}

const DataTableControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DataTableControls);

export default DataTableControls
