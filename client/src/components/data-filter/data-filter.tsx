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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Checkboxes from "./checkboxes";
import AgeFilter from "./age-filter";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import {primaryButtonStyles, successButtonStyles, warningButtonStyles} from "../../styles";

const useFilterValidationState = () => {
    const [isValid, _setIsValid] = useState(true);

    const setIsValid = (value: boolean) => {
        _setIsValid(value)
    };

    return {
        isValid,
        setIsValid
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    title: {
        margin: theme.spacing(1, 0),
        textTransform: 'capitalize'
    },
    titleActive: {
        ...successButtonStyles(theme).root
    },
    titleInactive: {
        ...primaryButtonStyles(theme).root
    },
    dropdown: {
        padding: theme.spacing(1, 0),
        marginBottom: theme.spacing(2)
    },
    filtersGroup: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: theme.spacing(1)
    },
    filterWrapper: {
        // minWidth: 200,
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1, 2),
        }
    },
    buttons: {
        marginLeft: theme.spacing(2)
    },
    applyButton: {
        ...successButtonStyles(theme).root,
        margin: theme.spacing(1),
    },
    resetButton: {
        ...warningButtonStyles(theme).root,
        margin: theme.spacing(1),
    }
}));

interface DataFilterProps {
    reset: () => void,
    apply: () => void,
    alter: (filterName: string, optionName: string, value: any) => void,
    filterState: State['filter']['pending'],
    isPendingChanged: State['filter']['isPendingChanged'],
    isActiveFilterSameAsDefault: State['filter']['isActiveFilterSameAsDefault'],
    callBackOnFilterApplied?: () => void,
    disabled?: boolean
}

const _DataFilter: React.FC<DataFilterProps> = (
    {
        apply,
        alter,
        reset,
        filterState,
        isPendingChanged,
        isActiveFilterSameAsDefault,
        callBackOnFilterApplied,
        disabled
    }) => {
    const classes = useStyles();

    const [dropdown, setDropdown] = useState(false);
    const sexValidation = useFilterValidationState();
    const deathValidation = useFilterValidationState();
    const severityValidation = useFilterValidationState();
    const ageValidation = useFilterValidationState();

    const areFiltersValid = [
        sexValidation.isValid,
        deathValidation.isValid,
        severityValidation.isValid,
        ageValidation.isValid
    ].indexOf(false) === -1;
    const canApplyNewFilter = areFiltersValid && !disabled && isPendingChanged;

    const toggleDropdown = () => {
        setDropdown(state => !state)
    };

    const applyFilter = () => {
        if (!areFiltersValid) return;
        apply();
        if (callBackOnFilterApplied) callBackOnFilterApplied()
    };

    const resetFilter = () => {
        reset();
        if (callBackOnFilterApplied) callBackOnFilterApplied()
    };


    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color='primary'
                disableElevation
                className={`${classes.title} ${isActiveFilterSameAsDefault ? classes.titleInactive : classes.titleActive}`}
                endIcon={dropdown ? <KeyboardArrowDownIcon/> : <ChevronRightIcon/>}
                aria-expanded={dropdown}
                onClick={toggleDropdown}
            >
                {
                    isActiveFilterSameAsDefault ? 'Filters' : 'Filters Applied'
                }
            </Button>
            {
                dropdown &&
                <Fade in timeout={500}>
                    <Paper className={classes.dropdown} elevation={0}>
                        <div className={classes.filtersGroup}>
                            <div className={classes.filterWrapper}>
                                <Checkboxes filterName={'sex'} options={filterState.sex} alter={alter} validation={sexValidation}/>
                            </div>
                            <div className={classes.filterWrapper}>
                                <Checkboxes filterName={'death'} options={filterState.death} alter={alter} validation={deathValidation}/>
                            </div>
                            <div className={classes.filterWrapper}>
                                <Checkboxes filterName={'severity'} options={filterState.severity} alter={alter} validation={severityValidation}/>
                            </div>
                            <div className={classes.filterWrapper}>
                                <AgeFilter filterName={'age'} alter={alter} min={filterState.age.min} max={filterState.age.max} validation={ageValidation}/>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <Button variant="contained" className={classes.applyButton} disableElevation onClick={applyFilter} disabled={!canApplyNewFilter}>
                                {
                                    isPendingChanged ? 'Apply new filters' : 'Filters applied'
                                }
                            </Button>
                            <Button variant="contained" className={classes.resetButton} disableElevation onClick={resetFilter} disabled={disabled}>
                                Reset all filters
                            </Button>
                        </div>
                    </Paper>
                </Fade>
            }
        </div>
    )
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        reset: () => dispatch(resetAllFilter()),
        apply: () => dispatch<any>(applyPendingFilter()),
        alter: (filterName: string, optionName: string, value: any) => dispatch(alterPendingFilter(filterName, optionName, value))
    }
}

function mapStateToProps(state: State) {
    return {
        filterState: {...state.filter.pending},
        isPendingChanged: state.filter.isPendingChanged,
        isActiveFilterSameAsDefault: state.filter.isActiveFilterSameAsDefault
    }
}

const DataFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DataFilter);


export default DataFilter
