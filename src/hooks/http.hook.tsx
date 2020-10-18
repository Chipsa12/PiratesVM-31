import { useCallback, useState } from 'react';
import { METHODS } from '../constants/methods.contants';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (url, method = METHODS.GET, body = null, headers = {}) => {
    setLoading(true);

    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-type'] = 'application/json';
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        return data;
      }
      throw new Error(data.message || 'Что-то пошло не так!');
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { request, clearError, error, loading };
};

export default useHttp;
