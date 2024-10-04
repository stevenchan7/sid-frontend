import announcement from '@/types/announcement.type';
import { create } from 'zustand';

interface AnnouncementState {
	search: string;
	announcements: announcement[];
	selectedAnnouncement: announcement | null;
	setAnnouncements: (data: announcement[]) => void;
	setAnnouncementsPaginate: (data: announcement[]) => void;
	setSearch: (data: string) => void;
	setSelectedAnnouncement: (data: announcement) => void;
}

export const useAnnouncementStore = create<AnnouncementState>()((set, get) => ({
	search: '',
	announcements: [], // Initialize announcements as an empty array
	selectedAnnouncement: null,
	setAnnouncements: (data) => set({ announcements: data }), // Update the announcements state
	setAnnouncementsPaginate: (data) => set({ announcements: [...get().announcements, ...data] }),
	setSearch: (data) => set({ search: data }),
	setSelectedAnnouncement: (data) => set({ selectedAnnouncement: data }),
}));
