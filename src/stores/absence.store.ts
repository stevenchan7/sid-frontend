import Absence from '@/types/absence.type';
import { create } from 'zustand';

interface absenceState {
	absenceHistory: Absence[];
	setAbsenceHistory: (data: Absence[]) => void;
}

export const useAbsenceStore = create<absenceState>()((set) => ({
	absenceHistory: [],
	setAbsenceHistory: (data) => set({ absenceHistory: data }),
}));
