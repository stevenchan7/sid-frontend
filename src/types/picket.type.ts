import Lecturer from './lecturer.type';

export default interface Picket {
	id: number;
	day: 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat';
	location: string;
	lecturer: Lecturer;
}
