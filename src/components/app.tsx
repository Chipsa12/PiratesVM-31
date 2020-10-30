import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import Authorization from './authorization';
import useAuth from '../hooks/auth.hook';
import ErrorBoundary from './common/error-boundary/error-boundary';
import Lobby from './lobby';
import Menu from './menu';
import CreateTeam from './create-team';
import TeamRoom from './team-room';
import * as URLS from '../constants/url.constants';

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
                <Route path={URLS.CREATE_TEAM_URL} exact component={CreateTeam} />
                <Route path={URLS.LOBBY_URL} exact component={Lobby} />
                <Route path={URLS.TEAM_ROOM_URL} exact component={TeamRoom} />
                <Route path={URLS.BASE_URL} exact component={Menu} />
                <Redirect to={URLS.BASE_URL} />
              </>
            )
            : (
              <>
                <Route path={URLS.AUTH_URL} component={Authorization} />
                <Redirect to={URLS.AUTH_URL} />
              </>
            )}
        </Switch>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
