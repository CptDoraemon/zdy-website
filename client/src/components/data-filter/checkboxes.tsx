import React, {Dispatch, SetStateAction, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    root: {
        width: 150
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 700,
        '&$:focus': {
            color: theme.palette.error.main,
        }
    }
}));

interface CheckboxesProps {
    filterName: string,
    options: {
        [key: string]: boolean
    },
    alter: (filterName: string, optionName: string, value: any) => void,
    validation: {
        isValid: boolean,
        setIsValid: (value: boolean) => void
    }
}

const Checkboxes: React.FC<CheckboxesProps> = ({filterName, options, alter, validation}) => {
    const classes = useStyles();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        alter(filterName, e.target.name, e.target.checked)
    };

    useEffect(() => {
        // validation check
        // at least one option is required
        const values = Object.values(options);
        if (values.indexOf(true) === -1) {
            validation.setIsValid(false)
        } else {
            validation.setIsValid(true)
        }
    }, [options]);

    return (
        <FormControl component="fieldset" className={classes.root}>
            <FormLabel
                error={!validation.isValid}
                component="legend"
                classes={{
                    root: validation.isValid ? classes.capitalize : `${classes.capitalize} ${classes.error}`
                }}
            >
                {filterName}</FormLabel>
            <FormGroup>
                {
                    Object.entries(options).map((keyValuePair, i) => (
                        <FormControlLabel
                            key={i}
                            control={<Checkbox checked={keyValuePair[1]} onChange={changeHandler} name={keyValuePair[0]} />}
                            label={keyValuePair[0]}
                            className={classes.capitalize}
                        />
                    ))
                }
            </FormGroup>
            {
                !validation.isValid &&
                <FormHelperText className={classes.error}>At least one is required</FormHelperText>
            }
        </FormControl>
    )
};

export default Checkboxes
