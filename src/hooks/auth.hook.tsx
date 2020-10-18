import { useCallback, useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState('');

  const login = useCallback((token: string) => {
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken('');
  }, []);

  return { login, logout, token };
};

export default useAuth;
