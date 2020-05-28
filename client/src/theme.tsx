import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme({
    palette: {
        // primary: {
        //     main: '#41b3a3',
        //     contrastText: '#fff',
        // },
        // secondary: {
        //     main: '#e8a87c',
        //     contrastText: '#fff',
        // },
        // text: {
        //     primary: '#4a5568'
        // },
        // background: {
        //     default: 'rgb(241, 242, 245)'
        // }
    },
    typography: {
        "fontFamily": "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});
theme = responsiveFontSizes(theme);

export default theme;
