import { createContext } from 'react';

export interface AuthContextInterface {
  token: string;
  login: ({ login, password }: { login: string, password: string }) => void;
  logout: () => void;
  registration: ({ login, password }: { login: string, password: string }) => void;
}

const AuthContext = createContext<AuthContextInterface>({
  token: '',
  login: (data) => {},
  logout: () => {},
  registration: (data) => {},
});

export default AuthContext;
