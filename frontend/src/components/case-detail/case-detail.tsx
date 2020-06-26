import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from "@material-ui/core/Paper";
import useGetCaseDetail from "../../requests/use-get-case-detail";
import CaseDetailContent from "./case-detail-content";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    backButton: {
        margin: theme.spacing(1, 0)
    },
    paper: {
        padding: theme.spacing(2)
    },
    loading: {
        width: '100%',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

interface CaseDetailProps {
    id: string,
    goBack: () => void
}

const CaseDetail: React.FC<CaseDetailProps> = ({id, goBack}) => {
    const classes = useStyles();

    const {
        loading,
        error,
        errorMessage,
        data,
        getData
    } = useGetCaseDetail();

    useEffect(() => {
        getData(id)
    }, []);

    console.log(data);

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                disableElevation
                color="primary"
                className={classes.backButton}
                startIcon={<ArrowBackIcon />}
                onClick={goBack}
            >
                Back
            </Button>
            <Paper elevation={0} className={classes.paper}>
                {
                    loading &&
                    <div className={classes.loading}>
                        <CircularProgress disableShrink/>
                    </div>
                }
                {
                    error &&
                    <div className={classes.loading}>
                        { errorMessage }
                    </div>
                }
                {
                    data !== null &&
                        <CaseDetailContent image={data.image} id={data.id} age={data.age} sex={data.sex}/>
                }
            </Paper>
        </div>
    )
};


export default CaseDetail
