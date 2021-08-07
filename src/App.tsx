import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Container, CssBaseline} from '@material-ui/core';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import styles from './App.module.css';
import LandingPage from './component/LandingPage/LandingPage';
import TimeTrial from './component/TimeTrial/TimeTrial';
import TrialData from './component/TrialData/TrialData';
import OverallScore from "./component/OverallScore/OverallScore";
import LineAccuracy from "./component/LineAccuracy/LineAccuracy";

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
        <CssBaseline/>
        <Container className={styles.App} maxWidth={false}>
          <Router>
            <Switch>
              <Route path={'/overall-score'} component={OverallScore}/>
              <Route path={'/time-trial'} component={TimeTrial}/>
              <Route path={'/line-accuracy'} component={LineAccuracy}/>
              <Route path={'/trial-data'} component={TrialData}/>
              <Route path={'/'} component={LandingPage}/>
            </Switch>
          </Router>
        </Container>
      </ThemeProvider>
  );
}

export default App;
