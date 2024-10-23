import Lecturer from '@/types/lecturer.type';
import { create } from 'zustand';

interface LecturerState {
	lecturers: Lecturer[];
	setLecturers: (data: Lecturer[]) => void;
}

export const useLecturerStore = create<LecturerState>((set) => ({
	lecturers: [],
	setLecturers: (data) => set({ lecturers: data }),
}));
