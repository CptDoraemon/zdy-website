import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200,
    },
    dialogContentExtraPadding: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(6, 10)} !important`, // Mui bug, dev/prod inconsistent
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(3, 4)} !important`, // Mui bug, dev/prod inconsistent
        }
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default useStyles
