import Absence from './absence.type';
import Picket from './picket.type';
import Schedule from './schedule.type';

export default interface Lecturer {
  id: number;
  nidn: string;
  nip: string;
  name: string;
  profile_url: string;
  phone_number: string;
  email: string;
  address: string;
  absences: Absence[];
  schedules: Schedule[];
  pickets: Picket[];
}
