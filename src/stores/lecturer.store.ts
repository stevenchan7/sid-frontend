import { lecturer } from '@/types/lecturer.type';
import { create } from 'zustand';

interface LecturerState {
	lecturers: lecturer[];
	setLecturers: (data: lecturer[]) => void;
}

export const useLecturerStore = create<LecturerState>((set) => ({
	lecturers: [],
	setLecturers: (data) => set({ lecturers: data }),
}));
