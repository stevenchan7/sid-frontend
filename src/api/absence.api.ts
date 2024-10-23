import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';

export const getLecturerAbsence = async () => {
	try {
		const res = await sidAxios.get('/api/user/absences/lecturer', { withCredentials: true });

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const createAbsence = async () => {
	try {
		const res = await sidAxios.post('/api/user/absences', {}, { withCredentials: true });

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const updateAbsence = async ({ id, status, activity, location }: { id: number; status: string; activity: string; location: string }) => {
	try {
		const res = await sidAxios.post(
			'/api/user/absences/update',
			{
				id,
				status,
				activity,
				location,
			},
			{ withCredentials: true }
		);

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
