import React, {Dispatch, SetStateAction, useEffect} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import filterStyles from "./filter-styles";

const useStyles = makeStyles(theme => ({
    root: {
        ...filterStyles(theme).root,
    },
    legend: {
        ...filterStyles(theme).text,
        marginBottom: '4px'
    },
    checkboxLabel: {
        ...filterStyles(theme).text,
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 700,
        '&$:focus': {
            color: theme.palette.error.main,
        }
    },
    checkbox: {
        padding: '2px 9px'
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
                    root: validation.isValid ? classes.legend : `${classes.legend} ${classes.error}`
                }}
            >
                {filterName}</FormLabel>
            <FormGroup>
                {
                    Object.entries(options).map((keyValuePair, i) => (
                        <FormControlLabel
                            key={i}
                            control={
                                <Checkbox
                                    checked={keyValuePair[1]}
                                    onChange={changeHandler}
                                    name={keyValuePair[0]}
                                    className={classes.checkbox}
                                />
                            }
                            label={
                                <Typography
                                    variant={'body2'}
                                    component={'span'}
                                    className={validation.isValid ? classes.checkboxLabel : `${classes.checkboxLabel} ${classes.error}`}
                                >{keyValuePair[0]}
                                </Typography>
                            }
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
