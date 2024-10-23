import { getLecturer } from '@/api/lecturer.api';
import { useLecturerStore } from '@/stores/lecturer.store';
import { CreateScheduleFormValues } from '@/types/form.value';
import Lecturer from '@/types/lecturer.type';
import { FormControl, FormLabel, Select, FormErrorMessage } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, FieldInputProps, FormikProps } from 'formik';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

export default function LecturerSelect({ setSelectedLecturer }: { setSelectedLecturer: Dispatch<SetStateAction<Lecturer | null>> }) {
	const { lecturers, setLecturers } = useLecturerStore();

	const { data, isPending } = useQuery({
		queryKey: ['lecturers'],
		queryFn: () => getLecturer(),
	});

	useEffect(() => {
		if (data) {
			setLecturers(data);
		}
	}, [data]);

	function handleOnChange(e: ChangeEvent<HTMLSelectElement>, form: FormikProps<CreateScheduleFormValues>) {
		form.setFieldValue('lecturerId', e.target.value);
		setSelectedLecturer(lecturers.find((lecturer) => lecturer.id === parseInt(e.target.value)) || null);
	}

	return (
		<Field name='lecturerId'>
			{({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateScheduleFormValues> }) => (
				<FormControl isInvalid={!!(form.errors.lecturerId && form.touched.lecturerId)}>
					<FormLabel>Nama</FormLabel>
					<Select {...field} onChange={(e) => handleOnChange(e, form)} value={field.value} placeholder='Pilih Dosen'>
						{lecturers.map((lecturer) => (
							<option key={lecturer.id} value={lecturer.id}>
								{lecturer.name}
							</option>
						))}
					</Select>
					<FormErrorMessage>{form.errors.lecturerId}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	);
}
