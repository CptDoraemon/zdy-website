import React, {useEffect, useState} from "react";
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
        width: 150
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
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 700,
        '&$:focus': {
            color: theme.palette.error.main,
        }
    }
}));

interface AgeFilterProps {
    filterName: string,
    min: number,
    max: number,
    alter: (filterName: string, optionName: string, value: any) => void,
    validation: {
        isValid: boolean,
        setIsValid: (value: boolean) => void
    }
}

const AgeFilter: React.FC<AgeFilterProps> = ({filterName, alter, min, max, validation}) => {
    const classes = useStyles();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        alter(filterName, e.target.name, e.target.value)
    };

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // validation check
        if (min > max) {
            validation.setIsValid(false);
            setErrorMessage('Age min should be smaller than max')
        } else if (min < 0 || max < 0) {
            validation.setIsValid(false);
            setErrorMessage('Age cannot be negative')
        } else {
            validation.setIsValid(true);
            setErrorMessage('')
        }
    }, [min, max]);

    return (
        <FormControl component="fieldset" className={classes.root}>
            <FormLabel
                component="legend"
                classes={{
                    root: validation.isValid ? classes.capitalize : `${classes.capitalize} ${classes.error}`
                }}
            >{filterName}</FormLabel>
            <div className={classes.textFieldGroup}>
                <TextField label="Min" name="min" type={'number'} className={classes.textField} value={min} onChange={changeHandler}/>
                <TextField label="Max" name="max" type={'number'} className={classes.textField} value={max} onChange={changeHandler}/>
            </div>

            {
                !validation.isValid &&
                <FormHelperText className={classes.error}>{errorMessage}</FormHelperText>
            }
        </FormControl>
    )
};

export default AgeFilter
