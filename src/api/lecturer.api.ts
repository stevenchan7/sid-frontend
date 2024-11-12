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

export const getLecturerById = async (id: number) => {
  try {
    const res = await sidAxios.get(`/api/public/lecturers/${id}`);
    const {
      data: { lecturer },
    } = res.data;

    return lecturer;
  } catch (error) {
    handleError(error);
  }
};

export const updateLecturer = async () => {
  try {
    const res = await sidAxios.post('/api/user/lecturers/update');

    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};
