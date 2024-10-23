import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';

export const getLectures = async () => {
	try {
		const res = await sidAxios.get('/api/public/lectures');

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
