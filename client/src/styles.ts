import {createStyles, lighten, Theme} from "@material-ui/core/styles";

export const successButtonStyles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: lighten(theme.palette.success.main, 0.2),
        }
    }
});

export const warningButtonStyles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.warning.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: lighten(theme.palette.warning.main, 0.2),
        }
    }
});

export const primaryButtonStyles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: lighten(theme.palette.primary.main, 0.2),
        }
    }
});

