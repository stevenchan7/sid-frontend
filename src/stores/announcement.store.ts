import Announcement from '@/types/announcement.type';
import { create } from 'zustand';

interface AnnouncementState {
	search: string;
	announcements: Announcement[];
	selectedAnnouncement: Announcement | null;
	setAnnouncements: (data: Announcement[]) => void;
	setAnnouncementsPaginate: (data: Announcement[]) => void;
	setSearch: (data: string) => void;
	setSelectedAnnouncement: (data: Announcement) => void;
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
