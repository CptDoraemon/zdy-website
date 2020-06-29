import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link as MuiLink, Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Box from "@material-ui/core/Box";

type DownloadStatusTableData = {
    [key: string]: string,
    key: string,
    status: string,
    requestedAt: string,
    size: string,
    url: string,
}[]

interface DownloadStatusProps {
    data: DownloadStatusTableData
}

const headers = ['filters applied', 'status', 'requested at', 'file size', 'download'];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    link: {
        '&:hover': {
            color: theme.palette.secondary.main
        },
        '&:link': {
            textDecoration: 'underline'
        },
        '&:visited': {
            textDecoration: 'underline'
        }
    },
}));

const DownloadStatusTable: React.FC<DownloadStatusProps> = ({data}) => {
    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <DownloadStatusTableHead />
                    <TableBody>
                        {
                            data.map((obj, i) => {
                                return <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                >
                                    {
                                        Object.keys(obj).map((key, i) => {
                                            if (key === 'url') {
                                                return <TableCell>
                                                    <a className={classes.link} href={obj.url} target={'_blank'} rel={'noopener noreferrer'}>
                                                        download
                                                    </a>
                                                </TableCell>
                                            } else {
                                                return <TableCell>{obj[key]}</TableCell>
                                            }
                                        })
                                    }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};

const useTableHeadStyles = makeStyles(theme => ({
    capitalize: {
        textTransform: 'capitalize'
    },
}));

const DownloadStatusTableHead: React.FC = () => {
    const classes = useTableHeadStyles();

    return (
        <TableHead>
            <TableRow>
                {headers.map((name) => (
                    <TableCell key={name}>
                        <TableSortLabel
                            className={classes.capitalize}
                        >
                                {name}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
};

export default DownloadStatusTable
