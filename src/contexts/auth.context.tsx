import React, { createContext } from 'react';
import useAuth, { USER_DETAILS_INITIAL } from '../hooks/auth.hook';
import { UserInterface } from '../interfaces/user.interfaces';

export interface AuthContextInterface {
  userDetails: UserInterface;
  isAuth: boolean;
  loading: boolean;
  login: ({ login, password }: { login: string, password: string }) => void;
  logout: () => void;
  registration: ({ login, password }: { login: string, password: string }) => void;
}

const AuthContext = createContext<AuthContextInterface>({
  userDetails: USER_DETAILS_INITIAL,
  isAuth: false,
  loading: false,
  login: (data) => {},
  logout: () => {},
  registration: (data) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
