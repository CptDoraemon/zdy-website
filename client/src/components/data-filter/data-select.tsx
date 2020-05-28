import React, {ChangeEvent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
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

    const changeHandler = (e: any) => {
        console.log(e.target.value)
        onChange(e.target.value)
    };

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor={id} className={classes.capitalize}> { label } </InputLabel>
            <Select
                id={id}
                value={value === null ? notSelected : value}
                className={classes.capitalize}
                onChange={changeHandler}
            >
                <MenuItem value={notSelected}>None</MenuItem>
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
