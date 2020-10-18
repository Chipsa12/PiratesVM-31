import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  login: (token: string) => {},
  logout: () => {},
});

export default AuthContext;
