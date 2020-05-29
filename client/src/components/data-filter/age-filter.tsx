import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {

    },
    capitalize: {
        textTransform: 'capitalize'
    },
    textFieldGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: theme.spacing(1, 0)
    },
    textField: {
        width: 50,
        margin: theme.spacing(0, 1, 0, 0)
    }
}));

interface AgeFilterProps {
    filterName: string,
    min: number,
    max: number,
    alter: (filterName: string, optionName: string, value: any) => void,
}

const AgeFilter: React.FC<AgeFilterProps> = ({filterName, alter, min, max}) => {
    const classes = useStyles();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        alter(filterName, e.target.name, e.target.value)
    };

    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" className={classes.capitalize}>{filterName}</FormLabel>
            <div className={classes.textFieldGroup}>
                <TextField label="Min" name="min" type={'number'} className={classes.textField} value={min} onChange={changeHandler}/>
                <TextField label="Max" name="max" type={'number'} className={classes.textField} value={max} onChange={changeHandler}/>
            </div>
        </FormControl>
    )
};

export default AgeFilter
