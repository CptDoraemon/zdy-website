import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import makeStyles from "@material-ui/core/styles/makeStyles";
import RouterScrollRestoration from "./router-scroll-restoration";
import MainPage from "./components/main-page/main-page";
import Header from "./components/header/header";
import DataExplorer from "./components/data-explorer/data-explorer";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    widthWrapper: {
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
    }
}));

interface InnerAppProps {

}

const InnerApp: React.FC<InnerAppProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router basename={process.env.PUBLIC_URL}>
                <RouterScrollRestoration />
                <Header />
                    <Switch>
                        <Route path="/" exact render={ () => <MainPage /> } />
                        <div className={classes.widthWrapper}>
                            <Route path="/explore-data" exact render={ () => <DataExplorer /> } />
                        </div>
                    </Switch>
            </Router>
        </div>
    )
};

const store = configureStore();
const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <InnerApp />
            </ThemeProvider>
        </Provider>
    )
};

export default App;
