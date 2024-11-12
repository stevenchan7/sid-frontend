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

export const updateLecturer = async ({ id, name, phoneNumber, address, avatar }: { id: number | string; name: string; phoneNumber: string; address: string; avatar: string }) => {
  try {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    const res = await sidAxios.post('/api/user/lecturers/update', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.message;
  } catch (error) {
    handleError(error);
  }
};
