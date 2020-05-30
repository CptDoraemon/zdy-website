import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

}));

interface CaseDetailProps {
    id: string
}

const CaseDetail: React.FC<CaseDetailProps> = ({id}) => {
    const classes = useStyles();

    return (
        <div>
            Case detail {id}
        </div>
    )
};

export default CaseDetail
