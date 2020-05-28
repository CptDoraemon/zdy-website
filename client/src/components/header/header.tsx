import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, Box} from "@material-ui/core";
import NavList from "./nav-list";
import SearchBar from "./search-bar";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '50px',
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0, 2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    navList: {
        margin: theme.spacing(0, 4)
    },
    searchBar: {
        margin: theme.spacing(0, 4)
    }
}));

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={'h5'} component={'h1'}>
                <Box fontWeight={700}>
                    Database
                </Box>
            </Typography>
            <div className={classes.root}>
                <NavList />
            </div>
            <div className={classes.searchBar}>
                <SearchBar/>
            </div>
        </div>
    )
};

export default Header
