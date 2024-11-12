import Picket from '@/types/picket.type';
import Schedule from '@/types/schedule.type';
import { create } from 'zustand';

interface PicketState {
	pickets: Picket[];
	setPickets: (data: Picket[]) => void;
}

export const usePicketStore = create<PicketState>()((set) => ({
	pickets: [],
	setPickets: (data) => set({ pickets: data }),
}));
