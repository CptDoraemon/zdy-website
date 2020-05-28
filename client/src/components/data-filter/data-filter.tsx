import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DataSelect from "./data-select";
import {filterChoices, Filters} from "../../redux/types/filter";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import { State } from "../../redux/state";
import {
    alterAgeFilter,
    alterDeathFilter,
    alterGenderFilter,
    alterSeverityFilter,
    resetAllFilter
} from "../../redux/actions/filter";
import {Box, Button, Typography} from "@material-ui/core";

const ageChoices = filterChoices.age.slice();
const deathChoices = filterChoices.death.slice();
const genderChoices = filterChoices.gender.slice();
const severityChoices = filterChoices.severity.slice();

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    title: {
        margin: theme.spacing(2)
    },
    selectorsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    },
    selectorWrapper: {
        minWidth: 200,
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1, 2),
        }
    },
    button: {
        margin: theme.spacing(2)
    }
}));

interface DataFilterProps {
    gender: State['filter']['gender'],
    age: State['filter']['age'],
    severity: State['filter']['severity'],
    death: State['filter']['death'],
    reset: () => void,
    alterAgeFilter: (value: Filters['age']) => void,
    alterGenderFilter: (value: Filters['gender']) => void,
    alterDeathFilter: (value: Filters['death']) => void,
    alterSeverityFilter: (value: Filters['severity']) => void
}

const _DataFilter: React.FC<DataFilterProps> = (
    {
        gender,
        age,
        severity,
        death,
        alterGenderFilter,
        alterAgeFilter,
        alterDeathFilter,
        alterSeverityFilter,
        reset
    }) => {
    const classes = useStyles();
    const noFilterApplied =
        gender === null &&
        age === null &&
        severity === null &&
        death === null;

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant={'body1'} component={'div'}>
                    <Box fontWeight={700}>
                        Filters:
                    </Box>
                </Typography>
            </div>
            <div className={classes.selectorsWrapper}>
                <div className={classes.selectorWrapper}>
                    <DataSelect
                        value={gender}
                        label={'gender'}
                        onChange={alterGenderFilter}
                        choices={genderChoices}/>
                </div>
                <div className={classes.selectorWrapper}>
                    <DataSelect value={age} label={'age'} onChange={alterAgeFilter} choices={ageChoices}/>
                </div>
                <div className={classes.selectorWrapper}>
                    <DataSelect value={death} label={'death'} onChange={alterDeathFilter} choices={deathChoices}/>
                </div>
                <div className={classes.selectorWrapper}>
                    <DataSelect value={severity} label={'severity'} onChange={alterSeverityFilter} choices={severityChoices}/>
                </div>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="primary" disableElevation onClick={reset} disabled={noFilterApplied}>
                    Reset all filters
                </Button>
            </div>
        </div>
    )
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        reset: () => dispatch(resetAllFilter()),
        alterAgeFilter: (value: Filters['age']) => dispatch(alterAgeFilter(value)),
        alterGenderFilter: (value: Filters['gender']) => dispatch(alterGenderFilter(value)),
        alterDeathFilter: (value: Filters['death']) => dispatch(alterDeathFilter(value)),
        alterSeverityFilter: (value: Filters['severity']) => dispatch(alterSeverityFilter(value))
    }
}

function mapStateToProps(state: State) {
    return {
        gender: state.filter.gender,
        age: state.filter.age,
        severity: state.filter.severity,
        death: state.filter.death,
    }
}

const DataFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DataFilter);


export default DataFilter
