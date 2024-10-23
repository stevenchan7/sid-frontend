import { sidAxios } from '@/utils/axios';
import { useState, useEffect } from 'react';

interface lecturer {
	name: string;
	nidn: string;
	nip: string;
	phone_number: string;
	profile_url: string;
	email: string;
	address: string;
	lecturer_account: {
		role: string;
	};
}

const useAuth = () => {
	const [user, setUser] = useState<null | { name: string; role: 'user' | 'admin' }>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | any>(null);

	const getAuthenticatedUser = async () => {
		try {
			const res = await sidAxios.get('/api/user/authenticated-user', {
				withCredentials: true,
			});

			setUser(res.data.data);
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
