import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import Authorization from './authorization/authorization';
import useAuth from '../hooks/auth.hook';
import { AUTH_URL, LOBBY_URL } from '../constants/url.constants';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import ErrorBoundary from './error-boundary/error-boundary';
import Lobby from './lobby/lobby';

const theme: DefaultTheme = {
  fg: '#ffe190',
  fgError: '#d4eee8',
  bg: '#237773',
  bgAdditional: '#1d3e3c',
  bgActive: '#6fb38e',
};

const App = () => {
  const auth = useAuth();
  const isAuth = !!auth.token;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <AuthContext.Provider value={auth}>
            <Switch>
              {isAuth
                ? (
                  <>
                    <Route path={LOBBY_URL} exact component={Lobby} />
                    <Redirect to={LOBBY_URL} />
                  </>
                )
                : (
                  <>
                    <Route path={AUTH_URL} exact component={Authorization} />
                    <Redirect to={AUTH_URL} />
                  </>
                )}
            </Switch>
          </AuthContext.Provider>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  );
};

export default App;
