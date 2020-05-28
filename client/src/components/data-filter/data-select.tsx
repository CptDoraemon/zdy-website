import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    active: {
        color: theme.palette.success.main,
        fontWeight: 700
    },
    inactive: {
        color: theme.palette.grey["500"]
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}));

interface DataSelectProps {
    label: string
    value: any,
    onChange: (value: any) => void,
    choices: any[][]
}

/**
 * @param choices First value in array will be use internally, second value will be displayed
 */

const DataSelect: React.FC<DataSelectProps> = ({label, value, onChange, choices}) => {
    const classes = useStyles();
    const id = `data-select-${label}`;
    const notSelected = 'null';
    const labelClassName = value === null ? `${classes.capitalize}` : `${classes.capitalize} ${classes.active}`;
    const selectionClassName = value === null ? `${classes.capitalize} ${classes.inactive}` : `${classes.capitalize}`;

    const changeHandler = (e: any) => {
        onChange(e.target.value === notSelected ? null : e.target.value)
    };

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor={id} className={labelClassName}> { label } </InputLabel>
            <Select
                id={id}
                value={value === null ? notSelected : value}
                className={selectionClassName}
                onChange={changeHandler}
            >
                <MenuItem value={notSelected}> All </MenuItem>
                {
                    choices.map((_, i) => (
                        <MenuItem value={_[0]} key={i} className={classes.capitalize}>
                                {_[1]}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
};

export default DataSelect
