import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    stickyHeaderTC: {
        backgroundColor: '#fff',
        borderBottom: 'solid 1px rgb(224,224,224)',
        borderTop: 'solid 1px rgb(224,224,224)'
    },
}));

interface EnhancedTableHeadProps {
    header: string[]
    numSelected: number,
    onSelectAllClick: (e: any) => void,
    rowCount: number,
}

const DataTableHead: React.FC<EnhancedTableHeadProps> = ({header, onSelectAllClick, numSelected, rowCount}) => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" classes={{stickyHeader: classes.stickyHeaderTC}}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all entries' }}
                    />
                </TableCell>

                {header.map((headCell, i) => (
                    <TableCell
                        classes={{stickyHeader: classes.stickyHeaderTC}}
                        key={i}
                        align={i === 0 ? 'left' : 'right'}
                        padding={'default'}
                    >
                        {headCell}
                    </TableCell>
                ))}

                <TableCell
                    align={'right'}
                    padding={'default'}
                    classes={{stickyHeader: classes.stickyHeaderTC}}
                >
                    More Info
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default DataTableHead
