import { ApiResponseDataType } from '@/types/axios.type';
import Picket from '@/types/picket.type';
import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';
import { sleep } from '@/utils/sleep';
import { AxiosResponse } from 'axios';

export const getPickets = async () => {
	try {
		const res: AxiosResponse<ApiResponseDataType<Picket[]>> = await sidAxios.get('/api/public/pickets');

		sleep();

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const createPicket = async ({ day, location, lecturerId }: { day: string; location: string; lecturerId: string }) => {
	try {
		const res: AxiosResponse<ApiResponseDataType<Picket>> = await sidAxios.post('/api/admin/pickets', { day, location, lecturerId }, { withCredentials: true });

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const deletePicket = async ({ id }: { id: string }) => {
	try {
		const res = await sidAxios.post('/api/admin/pickets/delete', { id }, { withCredentials: true });

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
