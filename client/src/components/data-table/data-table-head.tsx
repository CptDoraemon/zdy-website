import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

interface EnhancedTableHeadProps {
    header: string[]
    numSelected: number,
    onSelectAllClick: (e: any) => void,
    rowCount: number,
}

const DataTableHead: React.FC<EnhancedTableHeadProps> = ({header, onSelectAllClick, numSelected, rowCount}) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all entries' }}
                    />
                </TableCell>

                {header.map((headCell, i) => (
                    <TableCell
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
                >
                    More Info
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default DataTableHead
