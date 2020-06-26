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
        margin: theme.spacing(2, 0),
        '& h4': {
            margin: theme.spacing(0),
        },
        '& p': {
            margin: theme.spacing(1, 0),
        }
    },
    button: {
        margin: theme.spacing(2, 0),
        color: theme.palette.secondary.contrastText
    }
}));

interface SectionProps {
    title: string,
    link: string,
    description: string
}

const Section: React.FC<SectionProps> = ({title, link, description}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.contentWrapper}>
                <Typography variant={'h4'} component={'h2'}>
                    { title }
                </Typography>
                <Typography variant={'body1'} component={'p'}>
                    { description }
                </Typography>
                <div className={classes.button}>
                    <Button variant="contained" color="secondary" disableElevation to={link} component={Link}>
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Section
