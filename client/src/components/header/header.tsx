import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, Box, IconButton} from "@material-ui/core";
import NavList from "./nav-list";
import SearchBar from "./search-bar";
import MenuIcon from '@material-ui/icons/Menu';
import MobileNavList from "./mobile-nav-list";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '50px',
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0, 2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 1),
        }
    },
    navList: {
        margin: theme.spacing(0, 4),
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    mobileNavListButton: {
        display: 'none',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    searchBar: {
        marginLeft: 'auto',
        width: '250px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: theme.spacing(0, 1),
        }
    },
    mobileNav: {
        zIndex: theme.zIndex.appBar - 1,
        width: '100%',
        height: '50px',
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    }
}));

const Header: React.FC = () => {
    const classes = useStyles();
    const [mobileNavBarActive, setMobileNavBarActive] = useState(false);
    const toggleMobileNavBar = () => {
        setMobileNavBarActive(state => !state)
    };

    return (
        <>
            <div className={classes.root}>
                <IconButton aria-label="Navigation list" className={classes.mobileNavListButton} onClick={toggleMobileNavBar}>
                    <MenuIcon />
                </IconButton>
                <Typography variant={'h5'} component={'h1'}>
                    <Box fontWeight={700} mx={1}>
                        Database
                    </Box>
                </Typography>
                <div className={classes.navList}>
                    <NavList />
                </div>
                <div className={classes.searchBar}>
                    <SearchBar/>
                </div>
            </div>
            {
                mobileNavBarActive &&
                // @ts-ignore
                <Slide in={true} className={classes.mobileNav}>
                    <div className={classes.mobileNav}>
                        <MobileNavList />
                    </div>
                </Slide>
            }
        </>
    )
};

export default Header
