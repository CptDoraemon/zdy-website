import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import filterStyles from "./filter-styles";

const useStyles = makeStyles(theme => ({
    root: {
        ...filterStyles(theme).root,
    },
    legend: {
        ...filterStyles(theme).text,
        marginBottom: '4px'
    },
    textFieldGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textField: {
        width: 60,
        margin: theme.spacing(1, 1, 1, 0)
    },
    textFieldInput: {
        ...filterStyles(theme).text,
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
        } else if ((!min && min !== 0) || (!max && max !== 0)) {
            validation.setIsValid(false);
            setErrorMessage('Age cannot be empty')
        } else {
            validation.setIsValid(true);
            setErrorMessage('')
        }
    }, [min, max]);

    const textFieldProps = {
        type: 'number',
        className: classes.textField,
        onChange: changeHandler,
        error: !validation.isValid,
        InputProps: {
            classes: {
                input: classes.textFieldInput
            }
        }
    };

    return (
        <FormControl component="fieldset" className={classes.root}>
            <FormLabel
                component="legend"
                classes={{
                    root: validation.isValid ? classes.legend : `${classes.legend} ${classes.error}`
                }}
            >{filterName}</FormLabel>
            <div className={classes.textFieldGroup}>
                <TextField label="Min" name="min" value={min} {...textFieldProps}/>
                <TextField label="Max" name="max"value={max} {...textFieldProps}/>
            </div>

            {
                !validation.isValid &&
                <FormHelperText className={classes.error}>{errorMessage}</FormHelperText>
            }
        </FormControl>
    )
};

export default AgeFilter
