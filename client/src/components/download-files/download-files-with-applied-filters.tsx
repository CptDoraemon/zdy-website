import React, {useEffect, useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

interface DownloadFilesWithAppliedFiltersProps {

}

const DownloadFilesWithAppliedFilters: React.FC<DownloadFilesWithAppliedFiltersProps> = () => {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" disableElevation onClick={() => false} classes={{root: classes.root}}>
            Download All
        </Button>
    )
};

export default DownloadFilesWithAppliedFilters
