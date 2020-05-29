import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import { State } from "../../redux/state";
import {
    alterPendingFilter,
    applyPendingFilter,
    resetAllFilter
} from "../../redux/actions/filter";
import {Button} from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkboxes from "./checkboxes";
import AgeFilter from "./age-filter";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    title: {
        margin: theme.spacing(2, 0),
        textTransform: 'capitalize'
    },
    filtersGroup: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    filterWrapper: {
        // minWidth: 200,
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1, 2),
        }
    },
    buttons: {
        margin: theme.spacing(2)
    },
    applyButton: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        margin: theme.spacing(0, 1, 0, 0)
    },
    resetButton: {
        backgroundColor: theme.palette.warning.main,
        color: '#fff',
    }
}));

interface DataFilterProps {
    reset: () => void,
    apply: () => void,
    alter: (filterName: string, optionName: string, value: any) => void,
    filterState: State['filter']['pending'],
    isPendingChanged: State['filter']['isPendingChanged'],
    isActiveApplied: State['filter']['isActiveApplied'],
    callBackOnFilterApplied?: () => void
}

const _DataFilter: React.FC<DataFilterProps> = (
    {
        apply,
        alter,
        reset,
        filterState,
        isPendingChanged,
        isActiveApplied,
        callBackOnFilterApplied
    }) => {
    const classes = useStyles();

    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => {
        setDropdown(state => !state)
    };

    const applyFilter = () => {
        apply();
        if (callBackOnFilterApplied) callBackOnFilterApplied()
    };

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.title}
                endIcon={<FilterListIcon/>}
                aria-expanded={dropdown}
                onClick={toggleDropdown}
            >
                Filters
            </Button>
            {
                dropdown &&
                <>
                    <div className={classes.filtersGroup}>
                        <div className={classes.filterWrapper}>
                            <Checkboxes filterName={'gender'} options={filterState.gender} alter={alter}/>
                        </div>
                        <div className={classes.filterWrapper}>
                            <Checkboxes filterName={'death'} options={filterState.death} alter={alter}/>
                        </div>
                        <div className={classes.filterWrapper}>
                            <Checkboxes filterName={'severity'} options={filterState.severity} alter={alter}/>
                        </div>
                        <div className={classes.filterWrapper}>
                            <AgeFilter filterName={'age'} alter={alter} min={filterState.age.min} max={filterState.age.max}/>
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        <Button variant="contained" className={classes.applyButton} disableElevation onClick={applyFilter} disabled={!isPendingChanged}>
                            {
                                isPendingChanged ? 'Apply new filters' : 'Filters applied'
                            }
                        </Button>
                        <Button variant="contained" className={classes.resetButton} disableElevation onClick={reset} disabled={false}>
                            Reset all filters
                        </Button>
                    </div>
                </>
            }
        </div>
    )
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        reset: () => dispatch(resetAllFilter()),
        apply: () => dispatch(applyPendingFilter()),
        alter: (filterName: string, optionName: string, value: any) => dispatch(alterPendingFilter(filterName, optionName, value))
    }
}

function mapStateToProps(state: State) {
    return {
        filterState: {...state.filter.pending},
        isPendingChanged: state.filter.isPendingChanged,
        isActiveApplied: state.filter.isActiveApplied,
    }
}

const DataFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DataFilter);


export default DataFilter
