import React, { useContext } from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';
import { AUTH_URL } from '../../constants/url.constants';

export interface AppRouteProps {
  component: React.ComponentType<RouteComponentProps<any> | {}>;
  path: string;
  isPrivate: boolean;
}

const AppRoute: React.FC<AppRouteProps & RouteProps> = ({
  component: Component,
  path,
  isPrivate,
  ...rest
}) => {
  const { userDetails: { isAuth } } = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={props => (
        isPrivate && !isAuth
          ? <Redirect to={{ pathname: AUTH_URL }} />
          : <Component {...props} />
      )}
      {...rest}
    />
  );
};

export default AppRoute;
