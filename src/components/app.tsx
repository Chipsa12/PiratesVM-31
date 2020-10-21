import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import Authorization from './authorization/authorization';
import useAuth from '../hooks/auth.hook';
import { AUTH_URL, BASE_URL, LOBBY_URL } from '../constants/url.constants';
import ErrorBoundary from './common/error-boundary/error-boundary';
import Lobby from './lobby/lobby';
import Menu from './menu/menu';

const App = () => {
  const auth = useAuth();
  const isAuth = !!auth.token;

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={auth}>
        <Switch>
          {isAuth
            ? (
              <>
                <Route path={LOBBY_URL} exact component={Lobby} />
                <Route path={BASE_URL} exact component={Menu} />
                <Redirect to={BASE_URL} />
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
  );
};

export default App;
