import Lecture from '@/types/lecture.type';
import { create } from 'zustand';

interface LectureState {
	lectures: Lecture[];
	setLectures: (data: Lecture[]) => void;
}

export const useLectureStore = create<LectureState>((set) => ({
	lectures: [],
	setLectures: (data) => set({ lectures: data }),
}));
