import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {DownloadStatusTableData, SortOption, DownloadStatusTableDataObjectKey} from "./use-download-status-table-sort";

interface DownloadStatusProps {
    data: DownloadStatusTableData[],
    sortOption: SortOption,
    changeSortOption: (key: DownloadStatusTableDataObjectKey) => void
}

const headers: {
    key: DownloadStatusTableDataObjectKey,
    title: string
}[] = [
    {
        key: DownloadStatusTableDataObjectKey.key,
        title: 'filters applied'
    },
    {
        key: DownloadStatusTableDataObjectKey.status,
        title: 'status'
    },
    {
        key: DownloadStatusTableDataObjectKey.requestedAt,
        title: 'requested at'
    },
    {
        key: DownloadStatusTableDataObjectKey.size,
        title: 'file size'
    },
    {
        key: DownloadStatusTableDataObjectKey.url,
        title: 'download'
    },
];

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

const DownloadStatusTable: React.FC<DownloadStatusProps> = ({data, sortOption, changeSortOption}) => {
    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <TableContainer>
                <Table
                    aria-label="Download status table"
                    size={'medium'}
                >
                    <DownloadStatusTableHead sortOption={sortOption} changeSortOption={changeSortOption}/>
                    <TableBody>
                        {
                            data.map((obj, i) => {
                                return <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={obj.url}
                                >
                                    {
                                        Object.keys(obj).map((key, i) => {
                                            if (key === 'url') {
                                                return obj.url !== '' ?
                                                    <TableCell key={i}>
                                                        <a className={classes.link} href={obj.url} target={'_blank'} rel={'noopener noreferrer'}>
                                                            download
                                                        </a>
                                                    </TableCell> :
                                                    <TableCell key={i}>
                                                        {'-'}
                                                    </TableCell>
                                            } else {
                                                // @ts-ignore
                                                return <TableCell key={i}>{obj[key]}</TableCell>
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

interface DownloadStatusTableHeadProps {
    sortOption: SortOption,
    changeSortOption: (key: DownloadStatusTableDataObjectKey) => void
}

const DownloadStatusTableHead: React.FC<DownloadStatusTableHeadProps> = ({sortOption, changeSortOption}) => {
    const classes = useTableHeadStyles();

    return (
        <TableHead>
            <TableRow>
                {headers.map((obj) => (
                    <TableCell key={obj.key}>
                        <TableSortLabel
                            className={classes.capitalize}
                            active={sortOption.key === obj.key}
                            direction={sortOption.order}
                            onClick={() => changeSortOption(obj.key)}
                        >
                            {obj.title}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
};

export default DownloadStatusTable
