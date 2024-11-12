import announcement from '@/types/announcement.type';
import handleError from '@/utils/apiErrorHandler';
import { sidAxios } from '@/utils/axios';
import { sleep } from '@/utils/sleep';

export const getAnnouncement = async ({ page, limit, title, priority }: { page: number; limit: number; title?: string; priority?: 'normal' | 'penting' }): Promise<announcement[]> => {
	try {
		const res = await sidAxios.get('/api/public/announcements/paginate', {
			params: {
				page: page,
				limit: limit,
				title: title,
				priority: priority,
			},
		});

		return res.data.data;
	} catch (error) {
		handleError(error);
		return [];
	}
};

export const createAnnouncement = async ({ title, content, priority, medias }: { title: string; content: string; priority: string; medias: any[] }): Promise<string | any> => {
	const formData = new FormData();
	formData.append('title', title);
	formData.append('content', content);
	formData.append('priority', priority);

	if (medias && medias.length > 0) {
		for (let i = 0; i < medias.length; i++) {
			formData.append('medias', medias[i]);
		}
	}

	try {
		const res = await sidAxios.post('/api/user/announcements', formData, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};

export const getAnnouncementUser = async ({ page, limit }: { page: number; limit: number }) => {
	try {
		const res = await sidAxios.get('/api/user/announcements/paginate', {
			params: {
				page: page,
				limit: limit,
			},
			withCredentials: true,
		});

		sleep();

		return res.data.data;
	} catch (error) {
		handleError(error);
	}
};
