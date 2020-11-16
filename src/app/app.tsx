import React from 'react';
import Modal from 'react-modal';
import { BrowserRouter, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { routes } from '../config/routes';
import AppRoute from '../components/app-route';
import store from '../redux/store';
import { AppTheme, GlobalStyle } from '../theme/theme-default';
import ErrorBoundary from '../components/error-boundary';
import { AuthProvider } from '../contexts/auth.context';
import { Provider } from 'react-redux';

const authBackground = require('../assets/auth.png');

Modal.setAppElement('#root');

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${authBackground}) no-repeat;
  background-size: cover;
  color: ${props => props.theme.colors.text};
`;

const App = () => {
  return (
    <Container>
      <Switch>
        {routes.map((route) => (
          <AppRoute
            key={route.path}
            path={route.path}
            component={route.component}
            isPrivate={route.isPrivate}
            exact={true}
          />
        ))}
      </Switch>
    </Container>
  );
};

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={AppTheme}>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
