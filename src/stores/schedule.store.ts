import Schedule from '@/types/schedule.type';
import { create } from 'zustand';

interface ScheduleState {
	schedules: Schedule[];
	setSchedules: (data: Schedule[]) => void;
}

export const useScheduleStore = create<ScheduleState>()((set) => ({
	schedules: [],
	setSchedules: (data) => set({ schedules: data }),
}));
