import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { Container, CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import styles from './App.module.css';
import LandingPage from './component/LandingPage/LandingPage';
import OverallScore from './component/OverallScore/OverallScore';
import TrialData from './component/TrialData/TrialData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#163960',
            light: '#EDEBE8',
            dark: '#B3B1AF',
        },
        secondary: {
            main: '#F06D32',
            light: '#FAA333',
            dark: '#A11D23',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container className={styles.App}>
                <Router>
                    <Switch>
                        <Route path={'/overall-score'} component={OverallScore}></Route>
                        <Route path={'/trial-data'} component={TrialData}></Route>
                        <Route path={'/'} component={LandingPage}></Route>
                    </Switch>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;
