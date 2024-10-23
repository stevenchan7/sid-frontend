export default interface Announcement {
	id: string;
	title: string;
	content: string;
	priority: 'penting' | 'normal';
	lecturer: {
		name: string;
		profile_url: string;
	};
	announcement_medias: {
		media_url: string;
	}[];
	createdAt: string;
}
