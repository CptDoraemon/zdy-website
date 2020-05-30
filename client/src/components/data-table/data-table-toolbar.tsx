import {lighten, makeStyles} from "@material-ui/core/styles";
import React, {useMemo} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadButton from "./download-button";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        textTransform: 'capitalize'
    },
}));

interface EnhancedTableToolbarProps {
    selected: number[],
    title: string
}

const DataTableToolbar: React.FC<EnhancedTableToolbarProps> = ({selected, title}) => {
    const classes = useToolbarStyles();

    const numSelected = useMemo(() => selected.length, [selected]);

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    { title }
                </Typography>
            )}

            {
                numSelected > 0 ?
                <Tooltip title="Download Selected">
                    <DownloadButton text={'Download Selected'} list={selected}/>
                </Tooltip> :
                <Tooltip title="Download All">
                    <DownloadButton text={'Download All'} />
                </Tooltip>
            }
        </Toolbar>
    );
};

export default DataTableToolbar
