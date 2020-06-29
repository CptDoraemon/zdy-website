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
import DataDownload from "./components/data-download/data-download";
import CaseDetail from "./components/case-detail/case-detail";
import DownloadStatus from "./components/download-status/download-status";

const store = configureStore();

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    widthWrapper: {
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
        margin: theme.spacing(4, 0),
        padding: theme.spacing(0, 2)
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
                        <Route component={PagesWithWidthWrapper} />
                    </Switch>
            </Router>
        </div>
    )
};

const PagesWithWidthWrapper: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.widthWrapper}>
            <Switch>
                <Route path="/explore-data" exact render={ () => <DataExplorer /> } />
                <Route path="/file-repository" exact render={ () => <DataDownload /> } />
                <Route path="/download-status" exact render={ () => <DownloadStatus /> } />
                <Route path="/case-detail/:id" exact render={ (props) => <CaseDetail id={props.match.params.id} goBack={props.history.goBack}/> } />
            </Switch>
        </div>
    )
};

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
