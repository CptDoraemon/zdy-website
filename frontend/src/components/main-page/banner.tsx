import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentWrapper: {
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
        margin: theme.spacing(10, 0),
        padding: theme.spacing(0, 2),
        '& h2': {
            margin: theme.spacing(2, 0),
        },
        '& p': {
            margin: theme.spacing(1, 0),
        }
    },
    button: {
        margin: theme.spacing(1, 0),
        color: theme.palette.primary.contrastText
    }
}));

const Banner: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.contentWrapper}>
                <Typography variant={'h1'} component={'h2'}>
                    COVID-19
                </Typography>
                <Typography variant={'body1'} component={'p'}>
                    COVID-19 is an emerging, rapidly evolving situation.
                </Typography>
                <div className={classes.button}>
                    <Button variant="contained" color="primary" disableElevation to={'/'} component={Link}>
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Banner
