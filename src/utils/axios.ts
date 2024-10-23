import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './constant';
import { cookies } from 'next/headers';

// Extend AxiosRequestConfig to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export const sidAxios = axios.create({
	baseURL: API_BASE_URL,
});

const refreshTokenAxios = axios.create({
	baseURL: API_BASE_URL,
});

sidAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;

		if (error.response?.status == 403 && !originalRequest?._retry) {
			originalRequest._retry = true;

			try {
				const res = await refreshTokenAxios.get('/api/public/generate-access-token', { withCredentials: true });

				// Set cookie for new access token
				// Later

				return sidAxios(originalRequest);
			} catch (error) {
				console.error(error);
			}
		}

		return Promise.reject(error);
	}
);
