import {createStyles, Theme} from "@material-ui/core/styles";

const filterStyles = (theme: Theme) => createStyles({
    root: {
        width: 120
    },
    text: {
        textTransform: 'capitalize',
        fontSize: theme.typography.body2.fontSize
    }
});

export default filterStyles
