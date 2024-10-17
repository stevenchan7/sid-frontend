import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';
import { sleep } from '@/utils/sleep';

export const getLecturer = async () => {
	try {
		const res = await sidAxios.get('/api/public/lecturers');

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
