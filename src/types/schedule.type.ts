import Lecture from './lecture.type';
import Lecturer from './lecturer.type';

export default interface Schedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  location: string;
  classif: string;
  lecturer: Lecturer;
  lecture: Lecture;
}
