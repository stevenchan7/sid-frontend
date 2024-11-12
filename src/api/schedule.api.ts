import { CreateScheduleFormValues } from '@/types/form.value';
import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';

export const createSchedule = async ({ lecturerId, lectureId, day, startTime, endTime, classif, location }: CreateScheduleFormValues) => {
	try {
		const res = await sidAxios.post(
			'/api/admin/schedules',
			{
				lecturerId,
				lectureId,
				day,
				startTime,
				endTime,
				location,
				classif,
			},
			{ withCredentials: true }
		);

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const getSchedules = async () => {
	try {
		const res = await sidAxios.get('/api/public/schedules');

		console.log(res);

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
