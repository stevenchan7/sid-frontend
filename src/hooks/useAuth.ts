import { sidAxios } from '@/utils/axios';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState<null | { id: number; name: string; role: 'user' | 'admin' }>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);

  const getAuthenticatedUser = async () => {
    try {
      const res = await sidAxios.get('/api/user/authenticated-user', {
        withCredentials: true,
      });
      const {
        data: { user },
      } = res.data;

      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return { user, loading, error };
};

export default useAuth;
