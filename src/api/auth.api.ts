import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';

export const login = async (reqBody: { username: string; password: string; remember: boolean }) => {
	try {
		const res = await sidAxios.post('/api/public/login', reqBody, { withCredentials: true });

		return res;
	} catch (error) {
		handleError(error);
	}
};

export const logout = async () => {
	try {
		const res = await sidAxios.get('/api/public/logout', { withCredentials: true });

		return res;
	} catch (error) {
		handleError(error);
	}
};
