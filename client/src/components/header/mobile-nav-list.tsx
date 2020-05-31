import React from "react";
import {AppBar} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import {navListData} from "./nav-list-data";
import Tab from "@material-ui/core/Tab";
import {Link, useLocation} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    activeTab: {
        '&:visited': {
            color: theme.palette.secondary.main,
        },
        '&:link': {
            color: theme.palette.secondary.main,
        },
    },
    tabRoot: {
        opacity: 1,
        textTransform: 'capitalize'
    }
}));

const MobileNavList = () => {
    const classes = useStyles();
    const path = useLocation().pathname;

    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Tabs
                value={path}
                // onChange={handleChange}
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="navigation tabs"
            >
                {
                    navListData.map((tab, i) => (
                        // @ts-ignore
                        <Tab
                            label={tab.title}
                            component={Link}
                            to={tab.link}
                            value={tab.link}
                            key={tab.link}
                            classes={{
                                selected: classes.activeTab,
                                root: classes.tabRoot
                            }}
                        />
                    ))
                }
            </Tabs>
        </AppBar>
    )
};

export default MobileNavList
