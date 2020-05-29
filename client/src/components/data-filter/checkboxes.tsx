import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    root: {

    },
    capitalize: {
        textTransform: 'capitalize'
    }
}));

interface CheckboxesProps {
    filterName: string,
    options: {
        [key: string]: boolean
    },
    alter: (filterName: string, optionName: string, value: any) => void,
}

const Checkboxes: React.FC<CheckboxesProps> = ({filterName, options, alter}) => {
    const classes = useStyles();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        alter(filterName, e.target.name, e.target.checked)
    };

    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" className={classes.capitalize}>{filterName}</FormLabel>
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
            {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
    )
};

export default Checkboxes
