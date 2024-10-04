import announcement from '@/types/announcement.type';
import { sidAxios } from '@/utils/axios';
import { sleep } from '@/utils/sleep';

export const getAnnouncement = async (page: number, limit: number, title: string): Promise<announcement[]> => {
	try {
		const res = await sidAxios.get('/api/public/announcements/paginate', {
			params: {
				page: page,
				limit: limit,
				title: title,
			},
		});

		sleep();

		return res.data.data;
	} catch (error) {
		console.error(error);
		throw new Error('Terjadi kesalahan');
	}
};
