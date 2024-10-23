export default interface Absence {
	id: number;
	status: 'Mengajar' | 'Tidak Mengajar' | 'Istirahat' | 'Ijin' | 'Sakit' | 'Mengikuti Kegiatan';
	activity: string;
	location: string;
	start_time: string;
	end_time: string;
	lecturer_id: number;
	createdAt: string;
}
