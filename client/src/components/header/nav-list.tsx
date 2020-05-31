import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useLocation} from "react-router-dom";

interface NavListData {
    link: string,
    title: string
}

const navListData: NavListData[] = [
    {
        title: 'home',
        link: '/'
    },
    {
        title: 'explore data',
        link: '/explore-data'
    },
    {
        title: 'file repository',
        link: '/file-repository'
    },
    {
        title: 'about us',
        link: '/about'
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& li': {
            margin: theme.spacing(0, 2),
        },
        '& a': {
            textTransform: 'capitalize',
            fontWeight: 700,
            display: 'block',
            padding: theme.spacing(2),
        },
        '& a:hover': {
            color: theme.palette.secondary.main
        },
    },
    activeLink: {
        color: theme.palette.secondary.light
    }
}));

interface NavListProps {
    className?: string
}

const NavList: React.FC<NavListProps> = ({className}) => {
    const classes = useStyles();
    const path = useLocation().pathname;

    return (
        <ul className={className ? `${classes.root} ${className}` : classes.root}>
            {
                navListData.map(_ => (
                    <li key={_.title} className={path === _.link ? classes.activeLink : ''}>
                        <Link to={_.link}>
                            { console.log(path === _.link)}
                            { _.title }
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
};

export default NavList
