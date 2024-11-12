import Absence from '@/types/absence.type';
import { create } from 'zustand';

interface AbsenceState {
	absenceHistory: Absence[];
	setAbsenceHistory: (data: Absence[]) => void;
}

export const useAbsenceStore = create<AbsenceState>()((set) => ({
	absenceHistory: [],
	setAbsenceHistory: (data) => set({ absenceHistory: data }),
}));
